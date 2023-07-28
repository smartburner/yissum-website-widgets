import React, {useEffect, useState} from "react";
import BriefcaseTitle from "./components/BriefcaseTitle";
import BriefcaseItems from "./components/BriefcaseItems";
import BriefcaseTitleLoader from "./components/BriefcaseTitleLoader";
import ErrorHandler from "./components/ErrorHandler";
import ErrorBoundary from "./components/ErrorBoundary";

const BriefcaseApp = () => {

    const [appState, setAppState] = useState({
        briefcaseItemsNum: 0,
        briefcaseItems: [],
        isLoading: true,
        isError: false,
        errorMessage: "",
        errorCaption: ""
    });

    const removeBriefcaseItem = (briefcaseItemId) => {
        /**
         * 1. Remove Briefcase Item by ID from Local Storage
         * 2. Remove Briefcase Item by ID from appState
         * 3. Update Briefcase Items Number
         */

            // console.log(briefcaseItemId);
        let currentBCItemsLS = JSON.parse(localStorage.getItem('briefCaseItems'));

        if (currentBCItemsLS.length > 0) {
            const itemToRemove = currentBCItemsLS.indexOf(briefcaseItemId);
            currentBCItemsLS.splice((itemToRemove - 1), 1);

            localStorage.setItem('briefCaseItems', JSON.stringify(currentBCItemsLS));
            setAppState((prevState) => {

                const itemToRemove = prevState.briefcaseItems.indexOf(briefcaseItemId);
                prevState.briefcaseItems.splice((itemToRemove - 1), 1);

                let resultState = {
                    ...prevState,
                    briefcaseItemsNum: currentBCItemsLS.length,
                    briefcaseItems: prevState.briefcaseItems
                }

                // If we've removed Last Item - Showing message that we don't have any Technologies
                if (prevState.briefcaseItems.length === 0) {
                    resultState.isError = true;
                    resultState.errorMessage = "There are no Items in the Briefcase";
                    resultState.errorCaption = "Please add some Technologies to the Briefcase";
                }

                return resultState;
            });

            document.dispatchEvent(new Event("briefCaseItemsChanged"));
        }
    };

    useEffect(() => {
        /**
         * 1. Getting Items from Local Storage
         * 2. Fetching Items from server by IDs
         * 3. Pushing fetched Items to appState
         */

        const getTechnologiesByIdsNonce = BRIEFCASE_PAGE_NONCES.getTechnologiesByIdsNonce;

        if (getTechnologiesByIdsNonce) {

            let briefcaseItemsLS = JSON.parse(localStorage.getItem('briefCaseItems'));

            if (briefcaseItemsLS && briefcaseItemsLS.length > 0) {

                let requestBody = new FormData();
                requestBody.append('action', 'getTechnologiesByIds');
                requestBody.append('getTechnologiesByIdsNonce', getTechnologiesByIdsNonce);

                briefcaseItemsLS.forEach((briefcaseItem) => {
                    requestBody.append('technologyIds[]', briefcaseItem);
                });

                fetch('/wp-admin/admin-ajax.php', {
                    method: 'POST',
                    body: requestBody
                }).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.success) {

                        setAppState(prevState => ({
                            ...prevState,
                            briefcaseItems: response.data.technologies,
                            briefcaseItemsNum: response.data.technologies.length,
                            isLoading: false,
                        }))

                    } else {
                        setAppState((prevState) => ({
                            ...prevState,
                            isLoading: false,
                            isError: true,
                            errorMessage: response.data.message,
                            errorCaption: "Something went wrong..."
                        }));
                    }
                }).catch(error => {
                    setAppState((prevState) => ({
                        ...prevState,
                        isLoading: false,
                        isError: true,
                        errorMessage: error.message,
                        errorCaption: "Something went wrong..."
                    }));
                });

            } else {
                setAppState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isError: true,
                    errorMessage: "There are no Technologies in the Briefcase",
                    errorCaption: "Please add some Technologies to the Briefcase"
                }));
            }

        } else {
            setAppState((prevState) => ({
                ...prevState,
                isLoading: false,
                isError: true,
                errorMessage: "Incorrect Nonce code...",
                errorCaption: "Access denied"
            }));
        }

    }, []);

    return (
        <section className="yissum-briefcase">
            <div className="container">
                <ErrorBoundary>
                    {appState.isLoading ? (
                        <>
                            <BriefcaseTitleLoader/>
                            <BriefcaseTitleLoader/>
                        </>
                    ) : (
                        <>
                            <BriefcaseTitle briefcaseItemsNum={appState.briefcaseItemsNum}/>

                            {!appState.isError && (
                                <div className="yissum-briefcase-actions yissum-no-print">
                                    <button onClick={window.print} className="yissum-briefcase-actions__btn"
                                            disabled={appState.isLoading}
                                    >
                                        Print
                                    </button>
                                    <button onClick={() => console.log("Send Briefcase data to email...")}
                                            className="yissum-briefcase-actions__btn"
                                            disabled={appState.isLoading}
                                    >
                                        Send to Email
                                    </button>
                                </div>
                            )}
                            
                        </>
                    )}

                    {appState.isError ? (
                        <ErrorHandler errorMessage={appState.errorMessage}
                                      errorCaption={appState.errorCaption}
                        />
                    ) : (
                        <BriefcaseItems
                            isLoading={appState.isLoading}
                            briefcaseItems={appState.briefcaseItems}
                            removeBriefcaseItem={removeBriefcaseItem}
                        />
                    )}
                </ErrorBoundary>
            </div>
        </section>
    );

}

export default BriefcaseApp;