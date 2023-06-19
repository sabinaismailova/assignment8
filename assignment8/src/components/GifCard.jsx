import React, {useEffect, useState} from "react";

function GifCard(props){
    return (
        <img key={props.gifSlug} type="gif" src={props.gifURL} style={{margin:"8px"}}>{console.log(props.gifURL)}</img>
    )
}

export default GifCard