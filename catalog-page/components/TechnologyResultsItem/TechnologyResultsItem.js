import React from "react";
import './TechnologyResultsItem.scss';

class TechnologyResultsItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isTechnologyInBriefcase: false
        }

        this.addToBriefCaseButtonRef = React.createRef();
    }

    componentDidMount() {

        const briefcaseItemsLocalStorage = localStorage.getItem('briefCaseItems');
        if (briefcaseItemsLocalStorage) {
            const briefcaseItems = JSON.parse(briefcaseItemsLocalStorage);
            const currentTechnologyId = this.addToBriefCaseButtonRef.current.dataset.technologyId;

            if (briefcaseItems.length > 0 && currentTechnologyId) {
                briefcaseItems.forEach((briefcaseItem) => {
                    if (briefcaseItem === parseInt(currentTechnologyId)) {
                        this.setState({
                            isTechnologyInBriefcase: true
                        });
                    }
                })
            }
        }

    }

    addToBriefCaseClickHandler(event) {
        const technologyId = parseInt(event.currentTarget.dataset.technologyId);
        let briefCaseItems;

        const briefCaseItemsLocalStorage = localStorage.getItem('briefCaseItems');
        if (briefCaseItemsLocalStorage) {
            briefCaseItems = JSON.parse(briefCaseItemsLocalStorage);

            if (briefCaseItems.length > 0) {
                const indexOfTechnology = briefCaseItems.indexOf(technologyId);

                if (indexOfTechnology > -1) {
                    briefCaseItems.splice(indexOfTechnology, 1);

                    this.setState({
                        isTechnologyInBriefcase: false
                    });

                } else {
                    briefCaseItems.push(technologyId);
                    this.setState({
                        isTechnologyInBriefcase: true
                    });
                }

            } else {
                briefCaseItems.push(technologyId);
                this.setState({
                    isTechnologyInBriefcase: true
                });
            }

        } else {
            briefCaseItems = [];
            briefCaseItems.push(technologyId);
            this.setState({
                isTechnologyInBriefcase: true
            });
        }

        localStorage.setItem('briefCaseItems', JSON.stringify(briefCaseItems));
        document.dispatchEvent(new Event("briefCaseItemsChanged"));
    }

    render() {
        return (
            <div className="technologies-results-item">

                <div className="technologies-results-item__header">

                    <div className="technologies-results-item__id">
                        {this.props.TTMIDNumber ? 'No. ' + this.props.TTMIDNumber : "There is no assigned TTMID"}
                    </div>

                    <div className="technologies-results-item__btns">

                        <button className="technologies-results-item__briefcase-btn"
                                ref={this.addToBriefCaseButtonRef}
                                data-technology-id={this.props.technologyId}
                                onClick={this.addToBriefCaseClickHandler.bind(this)}
                        >
                            {this.state.isTechnologyInBriefcase ? ("Remove from Briefcase") : ("Add to Briefcase")}
                        </button>

                    </div>

                </div>

                <div className="technologies-results-item__body">
                    <div className="technologies-results-item-main">

                        <div className="technologies-results-item-main-info">

                            <h3 className="technologies-results-item__title">
                                {this.props.technologyTitle}
                            </h3>

                            <div className="technologies-results-item__excerpt">

                                <p className="technologies-results-item__excerpt-text">
                                    {this.props.technologyExcerpt}
                                </p>

                                <a className="technologies-results-item__excerpt-link"
                                   href={this.props.permalink}
                                >
                                    Read More
                                </a>
                            </div>

                        </div>

                        <div className="technologies-results-item-meta">

                            {this.props.technologyCategories.length > 0 && (
                                <div className="technologies-results-item-meta-item">

                                    <span className="technologies-results-item-meta__title">
                                        Category:&nbsp;
                                    </span>

                                    <span className="technologies-results-item-meta__values">
                                        {this.props.technologyCategories.map((technologyCategory, index) => (
                                            index < (this.props.technologyCategories.length - 1) ? technologyCategory.name + ", " : technologyCategory.name
                                        ))}
                                    </span>
                                </div>
                            )}

                            {/*{this.props.technologyKeywords.length > 0 && (
                                <div className="technologies-results-item-meta-item">

                                    <span className="technologies-results-item-meta__title">
                                        Keywords:&nbsp;
                                    </span>

                                    <span className="technologies-results-item-meta__values">
                                        {this.props.technologyKeywords.map((technologyKeyword, index) => (
                                            index < (this.props.technologyKeywords.length - 1) ? technologyKeyword.name + ", " : technologyKeyword.name
                                        ))}
                                    </span>
                                </div>
                            )}*/}

                        </div>
                    </div>

                    <div className="technologies-results-item__lead-researcher">
                        <h4 className="technologies-results-item__lead-researcher-title">
                            Lead Researcher:
                        </h4>
                        {(this.props.leadResearcherPermalink.length > 0 && this.props.leadResearcherName.length > 0) ? (
                            <a href={this.props.leadResearcherPermalink} className="technologies-results-item__lead-researcher-name">
                                {this.props.leadResearcherName}
                            </a>
                        ) : (
                            <span className="technologies-results-item__lead-researcher-name">
                                There is no assigned Lead Researcher
                            </span>
                        )}

                    </div>
                </div>

            </div>
        );

    }
}

export default TechnologyResultsItem;