import React from "react";
import './CatalogSearchFormTags.scss';
import CatalogSearchFormTag from "../CatalogSearchFormTag/CatalogSearchFormTag";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import CatalogSearchFormTagsLoader from "../CatalogSearchFormTagsLoader/CatalogSearchFormTagsLoader";

class CatalogSearchFormTags extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tagItems: [],
            isError: false,
            errorMessage: "",
            isLoading: false
        }
    }

    getTagsFromServer() {
        const getSubCategoriesNonce = CATALOG_PAGE_NONCES.getSubCategoriesNonce;

        if (getSubCategoriesNonce) {
            let requestBody = new FormData();

            requestBody.append('action', 'getTechnologySubCategories');
            requestBody.append('getSubCategoriesNonce', getSubCategoriesNonce);

            this.setState((oldState) => ({
                ...oldState,
                isLoading: true
            }));

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: requestBody
            }).then((response) => {

                return response.json();

            }).then((response) => {

                if (response.success) {

                    this.setState((oldState) => ({
                        ...oldState,
                        tagItems: response.data,
                        isLoading: false
                    }));

                } else {
                    throw new Error(response.data.message);
                }

            }).catch((error) => {
                this.setState((oldState) => ({
                    ...oldState,
                    isError: true,
                    errorMessage: error.message,
                    isLoading: false
                }));
            })
        }
    }

    componentDidMount() {
        this.getTagsFromServer();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <CatalogSearchFormTagsLoader/>
            );
        } else if (this.state.isError) {
            return (<ErrorHandler errorMessage={this.state.errorMessage}/>);
        } else {
            return (
                <div className="catalog-header-tags">
                    <h4 className="catalog-header-tags__title">
                        Suggested keywords
                    </h4>

                    <div className="catalog-header-tags-row">

                        {this.state.tagItems.map((tagItem) => (
                            <CatalogSearchFormTag key={tagItem.term_id}
                                                  keywordId={tagItem.term_id}
                                                  keywordName={tagItem.name}
                                                  catalogSearchForm={this.props.catalogSearchForm}
                            />
                        ))}

                    </div>
                </div>
            );
        }
    }
}

export default CatalogSearchFormTags;