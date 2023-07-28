import React from "react";

const BriefcaseTitle = (props) => {
    return (
        <h1 className="yissum-briefcase__title">
            My Briefcase ({props.briefcaseItemsNum})
        </h1>
    )
}

export default BriefcaseTitle;