import React from "react";
import BriefcaseItem from "./BriefcaseItem";
import BriefcaseItemLoader from "./BriefcaseItemLoader";

const BriefcaseItems = (props) => {
    return (
        <div className="yissum-briefcase-items">
            {
                props.isLoading ? (
                    <>
                        <BriefcaseItemLoader/>
                        <BriefcaseItemLoader/>
                        <BriefcaseItemLoader/>
                        <BriefcaseItemLoader/>
                    </>
                ) : (
                    props.briefcaseItems.map(briefcaseItem => (
                        <BriefcaseItem
                            key={briefcaseItem.id}
                            TTMIDNumber={briefcaseItem.technologyTTMID}
                            technologyId={briefcaseItem.id}
                            technologyTitle={briefcaseItem.name}
                            technologyExcerpt={briefcaseItem.excerpt}
                            permalink={briefcaseItem.permalink}
                            leadResearcher={briefcaseItem.leadResearcherName}
                            removeBriefcaseItem={props.removeBriefcaseItem}
                        />
                    ))
                )
            }
        </div>
    )
}

export default BriefcaseItems;