import React from "react";

function GifCard(props){
    //displays an img showing the gif/sticker with the specific URL passed in from props
    return (
        <img key={props.gifSlug} type="gif" src={props.gifURL} style={{margin:"8px"}} alt="gif"></img>
    )
}

export default GifCard