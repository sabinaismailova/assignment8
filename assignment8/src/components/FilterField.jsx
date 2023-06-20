import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles.css"

function FilterField(props) {

    async function handleFilter(e){
        //store the content type(gif/sticker)
        let type = e.target.value;
        //instantiate content array with the content of the specific type(gif/sticker)
        let typeContent = [];
        //when the displayed content is a result of a search, get the correct endpoint api(gifs/stickers) and set typeContent array to the endpoint results 
        if(props.searched===false){
            const typeGifContent = await axios.get(`https://api.giphy.com/v1/${type}s/trending?api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            typeContent = [...typeGifContent.data.data];
        }
        //when the displayed content is the trending content, get the correct endpoint api with correct type and search term and set typeContent to the andpoint results 
        else{
            const typeStickerContent = await axios.get(`https://api.giphy.com/v1/${type}s/search?q=${props.searchTerm}&api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            typeContent = [...typeStickerContent.data.data];
        }
        //set app.jsx file's giphy displayed content to the correct content changed based on the filtering options
        props.setGiphy(typeContent);
    }


    return (
        <div style={{verticalAlign:"middle", marginTop:"24px", marginBottom:"0px"}}>
            {
                //display the filter choices with a clickable radio
                //when a radio's clicked, chnage the displayed content based on user choice with the handleFilter function 
            }
            <input className="radio" type="radio" id="radio1" value="gif" onClick={handleFilter} name="type"></input>
            <label className="type" id="type1" for="radio1" style={{wordWrap:"break-word"}}>GIFs</label>
            <input className="radio" type="radio" id="radio2" value="sticker" onClick={handleFilter} name="type"></input>
            <label className="type" id="type2" for="radio2" style={{wordWrap:"break-word"}}>Stickers</label>
        </div>
    )
}

export default FilterField