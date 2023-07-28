import React, {useContext, useEffect, useState} from "react";
import './CatalogSearchResults.scss';
import {useSearchParams} from "react-router-dom";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TechnologyResultsItem from "../TechnologyResultsItem/TechnologyResultsItem";
import ResearcherResultsItem from "../ResearcherResultsItem/ResearcherResultsItem";
import ReactPaginate from "react-paginate";
import CatalogPageAppContext from "../../context/catalog-page-app-context";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import CatalogSearchResultsLoader from "../CatalogSearchResultsLoader/CatalogSearchResultsLoader";
import CatalogSearchResultItemLoader from "../CatalogSearchResultItemLoader/CatalogSearchResultItemLoader";

const CatalogSearchResults = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);

    const appContext = useContext(CatalogPageAppContext);

    useEffect(() => {
        const selectedMode = searchParams.get("mode");

        switch (selectedMode) {
            case "technologies" :
                setSelectedTab(0);
                break;

            case "researchers" :
                setSelectedTab(1);
                break;

            default:
                setSelectedTab(0);
                break;
        }
    });

    return (
        <>
            {appContext.isError ? (<ErrorHandler errorMessage={appContext.errorMessage}/>) : (
                <Tabs className="catalog-results"
                      onSelect={(index) => {
                          setSelectedTab(index);
                          switch (index) {
                              case 0:
                                  props.setSelectedMode("technologies");
                                  props.setSelectedModePostsCount(appContext.technologies.count);
                                  setSearchParams({
                                      mode: "technologies"
                                  });
                                  break;

                              case 1:
                                  props.setSelectedMode("researchers");
                                  props.setSelectedModePostsCount(appContext.researchers.count);
                                  setSearchParams({
                                      mode: "researchers"
                                  });
                                  break;
                          }
                      }}
                      selectedIndex={selectedTab}
                      domRef={(refNode) => props.getTabsSectionRef(refNode)}
                >
                    <div className="catalog-results-header">
                        <div className="container">
                            <TabList className="catalog-results-tabs">

                                <Tab className="catalog-results-tabs__item"
                                     selectedClassName="catalog-results-tabs__item_active"
                                >
                                    {appContext.isLoading ? (
                                        <CatalogSearchResultsLoader/>
                                    ) : (
                                        <>
                                            <span className="catalog-results-tabs__item-name">
                                                Technologies
                                            </span>
                                            <span className="catalog-results-tabs__item-count">
                                                {' ' + '(' + appContext.technologies.count + ')'}
                                            </span>
                                        </>
                                    )}

                                </Tab>
                                <Tab className="catalog-results-tabs__item"
                                     selectedClassName="catalog-results-tabs__item_active"
                                >
                                    {appContext.isLoading ? (
                                        <CatalogSearchResultsLoader/>
                                    ) : (
                                        <>
                                            <span className="catalog-results-tabs__item-name">
                                                Researchers
                                            </span>
                                            <span className="catalog-results-tabs__item-count">
                                                {' ' + '(' + appContext.researchers.count + ')'}
                                            </span>
                                        </>
                                    )}
                                </Tab>

                            </TabList>
                        </div>
                    </div>

                    <div className="catalog-results-body">
                        <TabPanel className="catalog-results-body__tab-pane"
                                  forceRender={true}
                                  selectedClassName="catalog-results-body__tab-pane_active"
                        >
                            <div className="container">
                                {
                                    appContext.isLoading ? (
                                        <>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                        </>
                                    ) : (
                                        appContext.technologies.count > 0 ? (
                                            appContext.technologies.items.map((technologyItem) => (
                                                <TechnologyResultsItem
                                                    key={technologyItem.id}
                                                    TTMIDNumber={technologyItem.technologyTTMID}
                                                    technologyId={technologyItem.id}
                                                    technologyTitle={technologyItem.name}
                                                    technologyExcerpt={technologyItem.excerpt}
                                                    permalink={technologyItem.permalink}
                                                    technologyCategories={technologyItem.technologyCategories}
                                                    technologyKeywords={technologyItem.technologyKeywords}
                                                    leadResearcherName={technologyItem.leadResearcherName}
                                                    leadResearcherPermalink={technologyItem.leadResearcherPermalink}
                                                />
                                            ))) : (
                                            <ErrorHandler errorMessage="There are no Technologies found"/>
                                        )
                                    )
                                }

                                {appContext.technologies.totalPages > 0 && (
                                    <ReactPaginate
                                        containerClassName="catalog-results-pagination"
                                        previousClassName="catalog-results-pagination__prev-page"
                                        nextClassName="catalog-results-pagination__next-page"
                                        pageClassName="catalog-results-pagination__page"
                                        activeClassName="catalog-results-pagination__page_active"
                                        breakLabel="..."
                                        breakClassName="catalog-results-pagination__separator"
                                        onPageChange={props.onTechnologiesPageClick}
                                        forcePage={appContext.technologies.selectedPage}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        pageCount={appContext.technologies.totalPages}
                                        previousLabel=""
                                        nextLabel=""
                                        renderOnZeroPageCount={null}
                                    />
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel className="catalog-results-body__tab-pane"
                                  forceRender={true}
                                  selectedClassName="catalog-results-body__tab-pane_active"
                        >
                            <div className="container">

                                {
                                    appContext.isLoading ? (
                                        <>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                            <CatalogSearchResultItemLoader/>
                                        </>
                                    ) : (
                                        appContext.researchers.count > 0 ? (
                                            appContext.researchers.items.map((researcherItem) => (
                                                <ResearcherResultsItem
                                                    key={researcherItem.id}
                                                    permalink={researcherItem.permalink}
                                                    researcherName={researcherItem.name}
                                                    facultyName={researcherItem.facultyName}
                                                    department={researcherItem.department}
                                                />
                                            ))) : (
                                            <ErrorHandler errorMessage="There are no Researchers found"/>
                                        )
                                    )
                                }

                                {appContext.researchers.totalPages > 0 && (
                                    <ReactPaginate
                                        containerClassName="catalog-results-pagination"
                                        previousClassName="catalog-results-pagination__prev-page"
                                        nextClassName="catalog-results-pagination__next-page"
                                        pageClassName="catalog-results-pagination__page"
                                        activeClassName="catalog-results-pagination__page_active"
                                        breakLabel="..."
                                        breakClassName="catalog-results-pagination__separator"
                                        onPageChange={props.onResearchersPageClick}
                                        forcePage={appContext.researchers.selectedPage}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        pageCount={appContext.researchers.totalPages}
                                        previousLabel=""
                                        nextLabel=""
                                        renderOnZeroPageCount={null}
                                    />
                                )}

                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            )}
        </>
    );
}

export default CatalogSearchResults;