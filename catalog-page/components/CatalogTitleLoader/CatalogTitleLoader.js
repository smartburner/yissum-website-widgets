import React from "react"
import ContentLoader from "react-content-loader"

const CatalogTitleLoader = (props) => (
    <ContentLoader
        speed={1.5}
        width={'100%'}
        height={40}
        viewBox="0 0 450 40"
        backgroundColor="#b3b3b3"
        foregroundColor="#e0e0e0"
        {...props}
    >
        <rect x="0" y="0" rx="5" ry="5" width="450" height="40" />
    </ContentLoader>
)

export default CatalogTitleLoader;