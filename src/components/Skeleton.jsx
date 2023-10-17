import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={1}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f78282"
        foregroundColor="#181616"
        {...props}
    >
        <circle cx="138" cy="133" r="130" />
        <rect x="1" y="271" rx="9" ry="9" width="280" height="24" />
        <rect x="0" y="319" rx="21" ry="21" width="280" height="84" />
        <rect x="8" y="429" rx="10" ry="10" width="90" height="27" />
        <rect x="129" y="422" rx="10" ry="10" width="151" height="44" />
    </ContentLoader>
)

export default Skeleton

