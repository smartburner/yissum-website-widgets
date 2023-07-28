import React, {useEffect, useState} from "react";
import './CatalogPageApp.scss';
import {useSearchParams} from "react-router-dom";
import CatalogHeader from "./components/CatalogHeader/CatalogHeader";
import CatalogSearchResults from "./components/CatalogSearchResults/CatalogSearchResults";
import CatalogPageAppContext from "./context/catalog-page-app-context";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const CatalogPageApp = () => {
    let catalogSearchResultsRef;

    // Using Search Params
    const [searchParams, setSearchParams] = useSearchParams();

    const [appState, setAppState] = useState({
        selectedMode: searchParams.get("mode") === "researchers" ? "researchers" : "technologies",
        selectedModePostsCount: 0,

        technologies: {
            count: 0,
            items: [],
            totalPages: 0,
            selectedPage: 0
        },
        researchers: {
            count: 0,
            items: [],
            totalPages: 0,
            selectedPage: 0
        },
        advancedSearch: {
            categoriesList: [],
            isError: false,
            errorMessage: "",
            isLoading: false
        },
        isError: false,
        errorMessage: "",
        isLoading: false
    });

    const predefinedResearcherID = parseInt(searchParams.get('researcherID'));

    const splitCategoriesIntoColumns = (categoriesArray = []) => {
        if (categoriesArray.length === 0) {
            return [];
        }

        let resultArray = [];
        const chunkSize = Math.ceil(categoriesArray.length / 3);

        for (let i = 0; i < categoriesArray.length; i += chunkSize) {
            resultArray.push(categoriesArray.slice(i, i + chunkSize));
        }

        return resultArray;
    }

    // Gets Technology Categories for the Advanced Search
    const getAdvancedSearchCategories = (preCheckedCategories = []) => {
        const getCategoriesNonce = CATALOG_PAGE_NONCES.getCategoriesNonce;

        if (getCategoriesNonce) {
            let requestBody = new FormData();
            requestBody.append('action', 'getTechnologyCategories');
            requestBody.append('getCategoriesNonce', getCategoriesNonce);

            // Loading...
            setAppState((prevState) => ({
                ...prevState,
                advancedSearch: {
                    ...prevState.advancedSearch,
                    isLoading: true
                }
            }));

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: requestBody
            }).then((response) => {

                return response.json();

            }).then((response) => {

                if (response.success) {

                    let categoriesList = response.data;

                    // Sync Checked Categories with the Search Params (URL Params)
                    if (preCheckedCategories.length > 0) {

                        preCheckedCategories.forEach((categoryID) => {

                            const intCategoryID = parseInt(categoryID);

                            if (intCategoryID) {
                                categoriesList.find((category) => category.term_id === intCategoryID).isChecked = true;
                            }
                        });

                    } else {
                        categoriesList.map((category) => {
                            category.isChecked = false;
                        });
                    }

                    // Splitting Categories into columns (chunks)
                    setAppState((prevState) => {
                        return {
                            ...prevState,
                            advancedSearch: {
                                categoriesList: splitCategoriesIntoColumns(categoriesList),
                                isError: false,
                                errorMessage: ""
                            }
                        };
                    });

                } else {
                    setAppState((prevState) => {
                        return {
                            ...prevState,
                            advancedSearch: {
                                categoriesList: [],
                                isError: true,
                                errorMessage: response.data.message
                            }
                        };
                    });
                }

                // Loading...
                setAppState((prevState) => ({
                    ...prevState,
                    advancedSearch: {
                        ...prevState.advancedSearch,
                        isLoading: false
                    }
                }));

            }).catch((error) => {
                setAppState((prevState) => {
                    return {
                        ...prevState,
                        advancedSearch: {
                            categoriesList: [],
                            isError: true,
                            errorMessage: error.message,
                            isLoading: false
                        }
                    };
                });
            });

        } else {
            setAppState((prevState) => {
                return {
                    ...prevState,
                    advancedSearch: {
                        categoriesList: [],
                        isError: true,
                        errorMessage: "Incorrect nonce is set for getting Technology Categories"
                    }
                };
            });
        }
    }

    const throwSearchResultsError = (errorMessage = "") => {
        setAppState((oldState) => ({
            ...oldState,
            isError: true,
            errorMessage: errorMessage
        }));
    };

    // Update State and Session Storage Data
    const updateSearchResults = (responseData) => {

        /*switch (appState.selectedMode) {
            case "technologies":
                updateTechnologiesResults(responseData);
                break;

            case "researchers":
                updateResearchersResults(responseData);
                break;

            default:
                updateTechnologiesResults(responseData);
                break;
        }*/

        setAppState((oldState) => ({
            ...oldState,
            isError: false,
            errorMessage: "",
            technologies: {
                count: responseData.technologiesData.postsCount,
                items: responseData.technologiesData.posts.length > 0 ? responseData.technologiesData.posts[0] : [],
                totalPages: responseData.technologiesData.pagination.totalPages,
                selectedPage: 0
            },
            researchers: {
                count: responseData.researchersData.postsCount,
                items: responseData.researchersData.posts.length > 0 ? responseData.researchersData.posts[0] : [],
                totalPages: responseData.researchersData.pagination.totalPages,
                selectedPage: 0
            }
        }));

        sessionStorage.setItem('catalogTechnologiesData', JSON.stringify({
            technologies: {
                count: responseData.technologiesData.postsCount,
                posts: responseData.technologiesData.posts,
                totalPages: responseData.technologiesData.pagination.totalPages
            }
        }));

        sessionStorage.setItem('catalogResearchersData', JSON.stringify({
            researchers: {
                count: responseData.researchersData.postsCount,
                posts: responseData.researchersData.posts,
                totalPages: responseData.researchersData.pagination.totalPages
            }
        }));

    }

    // Initial Data Loading
    const searchResultsInitialLoad = (preCheckedCategories = [], predefinedResearcher = null) => {
        const getInitialResultsNonce = CATALOG_PAGE_NONCES.getInitialCatalogDataNonce;

        if (getInitialResultsNonce) {

            // Setting State to Loading
            setAppLoading(true);

            let requestBody = new FormData();

            requestBody.append('action', 'getInitialCatalogData');
            requestBody.append('getInitialCatalogDataNonce', getInitialResultsNonce);

            if (preCheckedCategories.length > 0) {
                preCheckedCategories.forEach((preCheckedCategory) => {
                    requestBody.append('technologyCategories[]', preCheckedCategory);
                })
            }

            // Predefined Researcher from URL Params
            if (predefinedResearcher) {
                requestBody.append('predefinedResearcher', predefinedResearcher);
            }

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: requestBody
            }).then((response) => {

                return response.json();

            }).then((response) => {
                // console.log(response);

                if (response.success) {

                    updateSearchResults(response.data.response);
                    setAppState((prevState) => ({
                        ...prevState,
                        selectedModePostsCount: prevState.selectedMode === "technologies" ? response.data.response.technologiesData.postsCount : response.data.response.researchersData.postsCount
                    }))

                    // Setting State to Loading
                    setAppLoading(false);
                } else {
                    throw new Error(response.data.message);
                }

            }).catch((error) => {

                // Setting State to Loading
                setAppLoading(false);

                throwSearchResultsError(error.message);
            });
        } else {
            throwSearchResultsError("The nonce code for Loading Initial Results is not set");
        }
    }

    const setAppLoading = (loadingState = false) => {
        setAppState((oldState) => ({
            ...oldState,
            isLoading: loadingState
        }))
    }

    // Initial Data Loading
    useEffect(() => {

        let categoryIDsFromURL = searchParams.get('categories');

        // console.log(predefinedResearcherID)

        if (categoryIDsFromURL) {
            categoryIDsFromURL = categoryIDsFromURL.split(',');
        } else {
            categoryIDsFromURL = [];
        }

        getAdvancedSearchCategories(categoryIDsFromURL);

        if (!isNaN(predefinedResearcherID)) {
            searchResultsInitialLoad(categoryIDsFromURL, predefinedResearcherID);
        } else {
            searchResultsInitialLoad(categoryIDsFromURL);
        }

    }, []);

    const getTabsSectionRef = (tabsSectionRef) => {
        catalogSearchResultsRef = tabsSectionRef;
    }

    /**
     * Technologies Pagination Page Click handler
     * @param event
     */
    const handleTechnologiesPageClick = (event) => {

        const selectedPage = event.selected;
        const sessionSearchData = JSON.parse(sessionStorage.getItem('catalogTechnologiesData'));

        if (sessionSearchData) {
            setAppState((oldState) => ({
                ...oldState,
                technologies: {
                    count: sessionSearchData.technologies.count,
                    items: sessionSearchData.technologies.posts[selectedPage],
                    totalPages: sessionSearchData.technologies.totalPages,
                    selectedPage: selectedPage
                }
            }));

            catalogSearchResultsRef.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    /**
     * Researchers Pagination Page Click handler
     * @param event
     */
    const handleResearchersPageClick = (event) => {

        const selectedPage = event.selected;
        const sessionSearchData = JSON.parse(sessionStorage.getItem('catalogResearchersData'));

        if (sessionSearchData) {
            setAppState((oldState) => ({
                ...oldState,
                researchers: {
                    count: sessionSearchData.researchers.count,
                    items: sessionSearchData.researchers.posts[selectedPage],
                    totalPages: sessionSearchData.researchers.totalPages,
                    selectedPage: selectedPage
                }
            }));

            catalogSearchResultsRef.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    const setSelectedMode = (selectedMode) => {
        setAppState((oldState) => ({
            ...oldState,
            selectedMode: selectedMode,
        }));
    }

    const setSelectedModePostsCount = (selectedModePostsCount) => {
        setAppState((oldState) => ({
            ...oldState,
            selectedModePostsCount: selectedModePostsCount
        }));
    }

    return (

        <CatalogPageAppContext.Provider value={appState}>
            <div className="catalog">
                <ErrorBoundary>
                    <div className="catalog-body">
                        <CatalogHeader
                            updateSearchResults={updateSearchResults}
                            onSearchFormReset={searchResultsInitialLoad}
                            selectedMode={appState.selectedMode}
                            searchResultsNumber={appState.selectedModePostsCount}
                            onSearchResultsError={throwSearchResultsError}
                            setAppLoadingState={setAppLoading}
                            predefinedResearcherID={predefinedResearcherID}
                            setSearchParams={setSearchParams}
                            setSelectedMode={setSelectedMode}
                        />
                        <CatalogSearchResults
                            getTabsSectionRef={getTabsSectionRef}
                            onTechnologiesPageClick={handleTechnologiesPageClick}
                            onResearchersPageClick={handleResearchersPageClick}
                            setSelectedMode={setSelectedMode}
                            setSelectedModePostsCount={setSelectedModePostsCount}
                            onSearchResultsError={throwSearchResultsError}
                        />
                    </div>
                </ErrorBoundary>
            </div>
        </CatalogPageAppContext.Provider>
    );
}

export default CatalogPageApp;