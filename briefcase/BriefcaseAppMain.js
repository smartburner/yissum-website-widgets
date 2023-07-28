import React from "react";
import ReactDOM from "react-dom/client";
import BriefcaseApp from "./BriefcaseApp";
import "./briefcaseApp.scss";

const briefcaseAppRootEl = document.getElementById("yissum-briefcase");
if (briefcaseAppRootEl) {
    const briefcaseAppRoot = ReactDOM.createRoot(briefcaseAppRootEl);
    briefcaseAppRoot.render(
        <BriefcaseApp/>
    );
}