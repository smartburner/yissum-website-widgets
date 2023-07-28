import React, {useContext} from "react";
import './CatalogSearchFormTag.scss';
import CatalogPageAppContext from "../../context/catalog-page-app-context";

const CatalogSearchFormTag = (props) => {

    const appContext = useContext(CatalogPageAppContext);

    return (
        <div className="catalog-header-tags-item">

            <input id={"keyword-" + props.keywordId}
                   type="checkbox" value={props.keywordId}
                   name="technologyKeywords[]"
                   className="catalog-header-tags-item__input"
                   disabled={appContext.isLoading}
                   onChange={() => {
                       props.catalogSearchForm.dispatchEvent(new Event("submit", {
                           bubbles: true,
                           cancelable: true
                       }));
                   }}
            />

            <label htmlFor={"keyword-" + props.keywordId}
                   className="catalog-header-tags-item__label">
                    <span className="catalog-header-tags-item__keyword">
                        {props.keywordName}
                    </span>
            </label>

        </div>
    );
}

export default CatalogSearchFormTag;