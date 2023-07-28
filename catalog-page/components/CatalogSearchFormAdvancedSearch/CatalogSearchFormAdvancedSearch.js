import React, {useContext, useEffect} from "react";
import './CatalogSearchFormAdvancedSearch.scss';
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import CatalogPageAppContext from "../../context/catalog-page-app-context";

const CatalogSearchFormAdvancedSearch = (props) => {

    const appContext = useContext(CatalogPageAppContext);

    useEffect(() => {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                props.hideAdvancedSearch();
            }
        });
    }, []);

    const advancedSearchBtnClickHandler = (event) => {
        event.preventDefault();
        props.toggleAdvancedSearch();
    }

    return (
        <div className="catalog-search-form-advanced-search">

            <button
                className={props.advancedSearchIsOpen ? "catalog-search-form-advanced-search__btn catalog-search-form-advanced-search__btn_active" : "catalog-search-form-advanced-search__btn"}
                type="button"
                onClick={advancedSearchBtnClickHandler}
                disabled={appContext.isLoading}
            >
                {appContext.isLoading ? "Loading..." : "Advanced Search"}
            </button>

            <div
                className={props.advancedSearchIsOpen ? "catalog-search-form-advanced-search-modal catalog-search-form-advanced-search-modal_active" : "catalog-search-form-advanced-search-modal"}>
                <div className="catalog-search-form-advanced-search-modal-header">
                    <h6 className="catalog-search-form-advanced-search-modal__title">
                        Check all that apply
                    </h6>
                </div>

                <div className="catalog-search-form-advanced-search-modal-body">

                    {
                        appContext.advancedSearch.isError ? (<ErrorHandler errorMessage={appContext.advancedSearch.errorMessage}/>) :
                            appContext.advancedSearch.categoriesList.map((categoryColumn, index) => (
                                <div key={index.toString()} className="catalog-search-form-advanced-search-modal-col">

                                    {categoryColumn.map((category) => (
                                        <div key={category.term_id.toString()}
                                             className="catalog-search-form-advanced-search-modal-body__category">

                                            <input type="checkbox"
                                                   id={"category-" + category.term_id}
                                                   value={category.term_id}
                                                   name="technologyCategories[]"
                                                   defaultChecked={category.isChecked}
                                                   disabled={appContext.isLoading}
                                            />

                                            <label
                                                htmlFor={"category-" + category.term_id}>
                                                <span
                                                    className="catalog-search-form-advanced-search-modal-body__category-name">
                                                    {category.name + " " + "(" + category.count + ")"}
                                                </span>
                                            </label>

                                        </div>
                                    ))}

                                </div>
                            ))
                    }

                </div>

                {!appContext.advancedSearch.isError && (
                    <button
                        className="catalog-search-form-advanced-search-modal__apply"
                        type="button"
                        onClick={() => {
                            props.hideAdvancedSearch();

                            props.catalogSearchForm.dispatchEvent(new Event("submit", {
                                bubbles: true,
                                cancelable: true
                            }));
                        }}
                    >
                        Apply
                    </button>
                )}

            </div>

        </div>
    )
}

export default CatalogSearchFormAdvancedSearch;