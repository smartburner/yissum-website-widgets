import React from "react";
import './ErrorHandler.scss';

class ErrorHandler extends React.Component {

    constructor(props) {
        super(props);

        this.assetsPath = "/wp-content/themes/yissum-theme/assets/";
    }

    render() {
        return (
            <div className="catalog-error">
                <img src={this.assetsPath + "images/error_icon_2x.png"}
                     alt="Error"
                     className="catalog-error__image"
                />

                <h5 className="catalog-error__message">
                    {this.props.errorMessage}
                </h5>

                <p className="catalog-error__caption">
                    Please try again
                </p>
            </div>
        )
    }

}

export default ErrorHandler;