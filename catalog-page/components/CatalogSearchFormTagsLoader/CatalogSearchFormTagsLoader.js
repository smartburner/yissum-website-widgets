import React from "react"
import ContentLoader from "react-content-loader"

const CatalogSearchFormTagsLoader = (props) => {

    // Percentage Value
    const gap = 2;
    const tagWidth = 17.4;

    return (

        <div style={({
            overflowX: "auto"
        })}>
            <ContentLoader
                speed={1.5}
                width={'100%'}
                height={130}
                viewBox="0 0 1240 130"
                backgroundColor="#b3b3b3"
                foregroundColor="#e0e0e0"
                {...props}
            >
                <rect x="0" y="0" rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={(tagWidth + gap) + "%"} y="0" rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 2) + "%"} y="0" rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 3) + "%"} y="0" rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 4) + "%"} y="0" rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />

                <rect x="0"
                      y={80} rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={(tagWidth + gap) + "%"}
                      y={80} rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 2) + "%"}
                      y={80} rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 3) + "%"}
                      y={80} rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
                <rect x={((tagWidth + gap) * 4) + "%"}
                      y={80} rx="5" ry="5"
                      width={tagWidth + "%"}
                      height={50}
                />
            </ContentLoader>
        </div>

    )
}

export default CatalogSearchFormTagsLoader