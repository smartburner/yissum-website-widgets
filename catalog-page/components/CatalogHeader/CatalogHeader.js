import React, {useContext} from "react";
import './CatalogHeader.scss';
import CatalogTitle from "../CatalogTitle/CatalogTitle";
import CatalogSearchForm from "../CatalogSearchForm/CatalogSearchForm";
import CatalogPageAppContext from "../../context/catalog-page-app-context";
import CatalogTitleLoader from "../CatalogTitleLoader/CatalogTitleLoader";

const CatalogHeader = (props) => {

    const appContext = useContext(CatalogPageAppContext);

    return (
        <section className="catalog-header">

            {appContext.isLoading ? (
                <div className="container">
                    <CatalogTitleLoader/>
                </div>
            ) : (
                <CatalogTitle selectedMode={appContext.selectedMode}
                              searchResultsNumber={appContext.selectedModePostsCount}
                />
            )}

            <CatalogSearchForm
                onSearchFormReset={props.onSearchFormReset}
                updateSearchResults={props.updateSearchResults}
                onSearchResultsError={props.onSearchResultsError}
                setAppLoadingState={props.setAppLoadingState}
                predefinedResearcherID={props.predefinedResearcherID}
                setSearchParams={props.setSearchParams}
                setSelectedMode={props.setSelectedMode}
            />

        </section>
    );

}

export default CatalogHeader;