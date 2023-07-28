import React from "react";
import Autosuggest from 'react-autosuggest';
import './CatalogSearchFormSearchInput.scss';
import catalogPageAppContext from "../../context/catalog-page-app-context";

class CatalogSearchFormSearchInput extends React.Component {

    // Setting Context
    static contextType = catalogPageAppContext;

    constructor(props) {
        super(props);

        this.suggestionsList = [];
        this.technologiesSuggestionsList = [];
        this.researchersSuggestionsList = [];
        this.assetsPath = "/wp-content/themes/yissum-theme/assets/";

        this.state = {
            value: '',
            suggestions: [],
            inputPlaceholder: '',
            isLoading: false
        };

    }

    getSuggestionsListFromServer() {

        /**
         * 1. Get Search Tips for Technologies
         * 2. Get Search Tips for Researchers
         * 3. Configure Switching between them when the SelectedMode updates
         */

            // Getting Technologies Tips
        const technologySearchTipsAutoloadNonce = CATALOG_PAGE_NONCES.technologySearchTipsAutoloadNonce;
        if (technologySearchTipsAutoloadNonce) {
            let requestBody = new FormData();
            requestBody.append('action', 'technologySearchTipsAutoload');
            requestBody.append('technologySearchTipsAutoloadNonce', technologySearchTipsAutoloadNonce);

            this.setState((oldState) => ({
                ...oldState,
                isLoading: true,
                inputPlaceholder: 'Loading...'
            }));

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: requestBody
            }).then((response) => {

                return response.json();

            }).then((response) => {

                if (response.success) {

                    this.technologiesSuggestionsList = response.data.technologyTips;
                    this.researchersSuggestionsList = response.data.researcherTips;
                    this.setState((oldState) => ({
                        ...oldState,
                        isLoading: false,
                        inputPlaceholder: 'Find Technologies or Researchers here...'
                    }));

                } else {
                    this.setState((oldState) => ({
                        ...oldState,
                        inputPlaceholder: response.data.message
                    }));
                }
            }).catch((error) => {
                this.setState((oldState) => ({
                    ...oldState,
                    inputPlaceholder: error.message
                }));
            });
        }


    }

    componentDidMount() {
        this.getSuggestionsListFromServer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Selecting proper Suggestions List
        if (this.context.selectedMode === "technologies") {
            this.suggestionsList = this.technologiesSuggestionsList;
        } else {
            this.suggestionsList = this.researchersSuggestionsList;
        }
    }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue(suggestion) {
        return suggestion;
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const resultsNumber = 5;

        // console.log("getSuggestions")

        if (inputLength !== 0) {
            return this.suggestionsList.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue)
            ).slice(0, resultsNumber);
        } else {
            return [];
        }

    };

    // Use your imagination to render suggestions.
    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion}
            </div>
        );
    }

    ////////

    onChange(event, {newValue}) {
        this.setState((oldState) => ({
            ...oldState,
            value: newValue
        }));
    };

    onFocus() {
        if (this.context.selectedMode === "technologies")
            this.props.hideAdvancedSearch();
    }

    onSuggestionSelected(event, {suggestionValue}) {
        this.props.onSuggestionSelected(suggestionValue);
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested({value}) {
        this.setState((oldState) => ({
            ...oldState,
            suggestions: this.getSuggestions(value)
        }));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState((oldState) => ({
            ...oldState,
            suggestions: []
        }));
    };

    // Finally, render it!
    render() {

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: this.state.inputPlaceholder,
            value: this.state.value,
            onChange: this.onChange.bind(this),
            onFocus: this.onFocus.bind(this),
            disabled: this.state.isLoading || this.context.isLoading
        };

        return (
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                renderInputComponent={
                    inputProps => (
                        <div className="react-autosuggest__input-group">
                            <input name="searchText" {...inputProps} />
                            <button type="submit" className="react-autosuggest__submit">
                                <img src={this.assetsPath + "images/search-icon.svg"}
                                     alt="Search"/>
                            </button>
                        </div>
                    )
                }

            />
        );
    }

}

export default CatalogSearchFormSearchInput;