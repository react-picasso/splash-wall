import React from "react";

const Image = ({url, alt_description}) => {
    return (
        <img src={url} alt={alt_description}></img>
    );
}

export default Image;