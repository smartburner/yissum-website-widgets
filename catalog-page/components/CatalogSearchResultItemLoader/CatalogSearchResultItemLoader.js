import React from "react"
import ContentLoader from "react-content-loader"

const CatalogSearchResultItemLoader = (props) => (
    <div style={({
        marginBottom: "30px"
    })}>
        <ContentLoader
            speed={1.5}
            width={'100%'}
            height={'100%'}
            viewBox="0 0 1240 285"
            backgroundColor="#b3b3b3"
            foregroundColor="#e0e0e0"
            {...props}
        >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="285" />
        </ContentLoader>
    </div>
);

export default CatalogSearchResultItemLoader;