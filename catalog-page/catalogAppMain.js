import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import CatalogPageApp from "./CatalogPageApp";

// React Part
const catalogAppRootEl = document.getElementById("yissum-catalog-app");
if (catalogAppRootEl) {
    const catalogAppRoot = ReactDOM.createRoot(catalogAppRootEl);
    catalogAppRoot.render(
        <BrowserRouter>
            <CatalogPageApp/>
        </BrowserRouter>
    );
}