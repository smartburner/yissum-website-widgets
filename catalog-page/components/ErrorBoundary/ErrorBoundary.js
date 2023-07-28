import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMessage: ""
        }

        this.assetsPath = "/wp-content/themes/yissum-theme/assets/";

    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: error.message
        };
    }

    render() {

        if (this.state.hasError) {
            return (
                <div className="catalog-error">
                    <img src={this.assetsPath + "images/error_icon_2x.png"}
                         alt="Error"
                         className="catalog-error__image"
                    />

                    <h5 className="catalog-error__message">
                        {this.state.errorMessage}
                    </h5>

                    <p className="catalog-error__caption">
                        Please try again
                    </p>
                </div>
            );
        } else {
            return this.props.children;
        }

    }
}

export default ErrorBoundary;