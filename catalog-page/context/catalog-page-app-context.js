import React from "react";

const CatalogPageAppContext = React.createContext({
    selectedMode: "technologies",
    selectedModePostsCount: 0,
    technologies: {
        count: 0,
        items: [],
        totalPages: 0,
        selectedPage: 0
    },
    researchers: {
        count: 0,
        items: [],
        totalPages: 0,
        selectedPage: 0
    },
    advancedSearch: {
        categoriesList: [],
        isError: false,
        errorMessage: "",
        isLoading: false
    },
    isError: false,
    errorMessage: "",
    isLoading: false
});

export default CatalogPageAppContext;