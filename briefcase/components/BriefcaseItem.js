import React from "react";

const BriefcaseItem = (props) => {
    return (
        <div className="yissum-briefcase-item">
            <div className="yissum-briefcase-item-header">
                <div className="yissum-briefcase-item__id">
                    {props.TTMIDNumber ? 'No. ' + props.TTMIDNumber : "There is no assigned TTMID"}
                </div>

                <button className="yissum-briefcase-item__remove-btn yissum-no-print"
                        data-technology-id={props.technologyId}
                        onClick={(event) => {
                            const technologyId = event.currentTarget.dataset.technologyId;
                            props.removeBriefcaseItem(technologyId);
                        }}
                >
                    Remove
                </button>
            </div>
            <div className="yissum-briefcase-item-body">
                <div className="yissum-briefcase-item-main">
                    <h3 className="yissum-briefcase-item__title">
                        {props.technologyTitle}
                    </h3>
                    <div className="yissum-briefcase-item-excerpt">
                        <p className="yissum-briefcase-item-excerpt__text">
                            {props.technologyExcerpt}
                        </p>
                        <a href="#" className="yissum-briefcase-item-excerpt__link yissum-no-print">
                            Read more
                        </a>
                    </div>
                </div>

                <div className="yissum-briefcase-item-lead-researcher">
                    <h4 className="yissum-briefcase-item-lead-researcher__title">
                        Lead Researcher:
                    </h4>
                    <span className="yissum-briefcase-item-lead-researcher__name">
                        {props.leadResearcher ? props.leadResearcher : "There is no assigned Lead Researcher"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BriefcaseItem;