import React from "react";

class ErrorHandler extends React.Component {

    constructor(props) {
        super(props);
        this.assetsPath = "/wp-content/themes/yissum-theme/assets/";
    }

    render() {
        return (
            <div className="yissum-briefcase-error">
                <img src={this.assetsPath + "images/error_icon_2x.png"}
                     alt="Error"
                     className="yissum-briefcase-error__image"
                />

                <h5 className="yissum-briefcase-error__message">
                    {this.props.errorMessage}
                </h5>

                <p className="yissum-briefcase-error__caption">
                    {this.props.errorCaption}
                </p>
            </div>
        );
    }
}

export default ErrorHandler;