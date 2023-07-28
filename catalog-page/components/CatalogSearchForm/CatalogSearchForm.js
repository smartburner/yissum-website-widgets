import React, {useContext, useRef, useState} from "react";
import './CatalogSearchForm.scss'
import CatalogSearchFormAdvancedSearch from "../CatalogSearchFormAdvancedSearch/CatalogSearchFormAdvancedSearch";
import CatalogSearchFormSearchInput from "../CatalogSearchFormSearchInput/CatalogSearchFormSearchInput";
import catalogPageAppContext from "../../context/catalog-page-app-context";

const CatalogSearchForm = (props) => {

    // Setting Context
    const appContext = useContext(catalogPageAppContext);

    const [formState, setFormState] = useState({
        advancedSearchIsOpen: false
    });

    const catalogSearchFormRef = useRef();
    const searchInputRef = useRef();

    const hideAdvancedSearch = () => {
        if (formState.advancedSearchIsOpen === true) {
            setFormState((oldState) => ({
                ...oldState,
                advancedSearchIsOpen: false
            }));
        }
    }

    const toggleAdvancedSearch = () => {
        setFormState((state) => ({
            ...state,
            advancedSearchIsOpen: !state.advancedSearchIsOpen
        }));
    }

    const makeFilteringRequest = (isOnSuggestionSelect = false, suggestionValue = null, event = null) => {

        const getFilteredCatalogDataNonce = CATALOG_PAGE_NONCES.getFilteredCatalogDataNonce;
        const getFilteredCatalogDataNonceName = "getFilteredCatalogDataNonce";
        const action = "getFilteredCatalogData";

        // Setting action and nonce code according to selected mode
        /*switch (appContext.selectedMode) {

            case "technologies" :
                action = "getFilteredTechnologiesData";
                getFilteredCatalogDataNonce = CATALOG_PAGE_NONCES.getFilteredTechnologiesDataNonce;
                getFilteredCatalogDataNonceName = "getFilteredTechnologiesDataNonce";
                break;

            case "researchers" :
                action = "getFilteredResearchersData";
                getFilteredCatalogDataNonce = CATALOG_PAGE_NONCES.getFilteredResearchersDataNonce;
                getFilteredCatalogDataNonceName = "getFilteredResearchersDataNonce";
                break;

            default:
                action = "getFilteredTechnologiesData";
                getFilteredCatalogDataNonce = CATALOG_PAGE_NONCES.getFilteredTechnologiesDataNonce;
                getFilteredCatalogDataNonceName = "getFilteredResearchersDataNonce";
                break;
        }*/

        if (getFilteredCatalogDataNonce) {

            let requestBody;

            if (isOnSuggestionSelect) {
                requestBody = new FormData();
                requestBody.append("searchText", suggestionValue);
            } else {
                // If it is the Request from the Form
                requestBody = new FormData(event.target);
            }

            requestBody.append('action', action);
            requestBody.append(getFilteredCatalogDataNonceName, getFilteredCatalogDataNonce);

            if (!isNaN(props.predefinedResearcherID)) {
                console.log("Not isNaN");
                requestBody.append('predefinedResearcher', props.predefinedResearcherID);
            }

            // Enables App Loading State
            props.setAppLoadingState(true);

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: requestBody
            }).then((response) => {
                return response.json();
            }).then((response) => {

                if (response.success) {

                    // Update the Search Results State
                    props.updateSearchResults(response.data.response);

                } else {
                    throw new Error(response.data.message);
                }

                // Disables App Loading State
                props.setAppLoadingState(false);

            }).catch((error) => {

                props.updateSearchResults({
                    technologiesData: {
                        postsCount: 0,
                        posts: [],
                        pagination: {
                            totalPages: 0
                        }
                    },
                    researchersData: {
                        postsCount: 0,
                        posts: [],
                        pagination: {
                            totalPages: 0
                        }
                    }
                });

                props.onSearchResultsError(error.message);

                // Disables App Loading State
                props.setAppLoadingState(false);
            });
        } else {

            props.updateSearchResults({
                technologiesData: {
                    postsCount: 0,
                    posts: [],
                    pagination: {
                        totalPages: 0
                    }
                },
                researchersData: {
                    postsCount: 0,
                    posts: [],
                    pagination: {
                        totalPages: 0
                    }
                }
            });

            props.onSearchResultsError("The nonce code for the filtering process doesn't set");
        }
    }

    const onSuggestionSelected = (suggestionValue) => {
        makeFilteringRequest(true, suggestionValue);
    }

    /**
     * Handles Form Submission
     * @param event
     */
    const searchFormSubmitHandler = (event) => {
        event.preventDefault();
        makeFilteringRequest(false, null, event);
    }

    return (
        <form className="catalog-search-form"
              onSubmit={searchFormSubmitHandler}
              onReset={() => {

                  // Clearing Search Input
                  searchInputRef.current.setState((prevState) => ({
                      ...prevState,
                      value: ''
                  }));

                  // Reset Search Results
                  props.onSearchFormReset();
              }}
              ref={catalogSearchFormRef}
        >

            <div className="container">

                <div className="catalog-search-form-main">

                    <CatalogSearchFormSearchInput
                        hideAdvancedSearch={hideAdvancedSearch}
                        onSuggestionSelected={onSuggestionSelected}
                        ref={searchInputRef}
                    />

                    {appContext.selectedMode === "technologies" && (
                        <CatalogSearchFormAdvancedSearch
                            advancedSearchIsOpen={formState.advancedSearchIsOpen}
                            toggleAdvancedSearch={toggleAdvancedSearch}
                            hideAdvancedSearch={hideAdvancedSearch}
                            catalogSearchForm={catalogSearchFormRef.current}/>
                    )}

                    <button type="reset"
                            className="catalog-search-form__clear-btn"
                            disabled={appContext.isLoading}
                            onClick={
                                () => {
                                    props.setSearchParams({});
                                    props.setSelectedMode("technologies")
                                }
                            }
                    >
                        Clear all
                    </button>


                </div>

            </div>

        </form>
    );

}

export default CatalogSearchForm;