import React from "react";
import './CatalogTitle.scss';

class CatalogTitle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMode: this.props.selectedMode,
            titleText: "Available " + this.props.selectedMode.charAt(0).toUpperCase() + this.props.selectedMode.slice(1),
            titleNum: this.props.searchResultsNumber
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.selectedMode !== state.selectedMode) {
            state.selectedMode = props.selectedMode;
            state.titleText = "Available " + props.selectedMode.charAt(0).toUpperCase() + props.selectedMode.slice(1);
        }

        if (props.searchResultsNumber !== state.titleNum) {
            state.titleNum = props.searchResultsNumber;
        }

        return state;
    }

    render() {

        return (
            <div className="catalog-header__title">
                <div className="container">
                    <h1>
                        <span className="catalog-header__title-text">
                            {this.state.titleText}
                        </span>
                        <span className="catalog-header__title-num">
                            {" " + "(" + this.state.titleNum + ")"}
                        </span>
                    </h1>
                </div>
            </div>
        );
    }
}

export default CatalogTitle;