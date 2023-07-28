import React from "react";
import './ResearcherResultsItem.scss';

class ResearcherResultsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.permalink} className="researchers-results-item" title={this.props.researcherName}>

                <div className="researchers-results-item-header">

                    <span className="researchers-results-item-header__name">
                        {this.props.researcherName}
                    </span>

                </div>

                <div className="researchers-results-item-info">
                    <div className="researchers-results-item-info-col">

                        <span className="researchers-results-item-info-col__title">
                            School/Faculty
                        </span>
                        <span className="researchers-results-item-info-col__content">
                            {this.props.facultyName ? this.props.facultyName : "There is no assigned Faculty"}
                        </span>

                    </div>

                    <div className="researchers-results-item-info-col">
                        <span className="researchers-results-item-info-col__title">
                            Department
                        </span>
                        <span className="researchers-results-item-info-col__content">
                            {this.props.department ? this.props.department : "There is no assigned Department"}
                        </span>
                    </div>

                </div>

            </a>
        );
    }


}

export default ResearcherResultsItem;