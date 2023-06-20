import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles.css"

function SearchField(props) {
    //store and set the search term 
    const [search, setSearch] = useState("");

    async function handleSubmit(event){
        event.preventDefault();
        try{
            //get the gifs related to the search using the search term in endpoint
            const fetchGifs = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            //get the stickers related to the search using search term in endpoint 
            const fetchStickers = await axios.get(`https://api.giphy.com/v1/stickers/search?q=${search}&api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            //store search related gifs and stickers in one array
            let fetchGiphy = [...fetchGifs.data.data,  ...fetchStickers.data.data];
            //set the giphy state to be displayed to the search related gifs and stickers array 
            props.setGiphy(fetchGiphy);
            //set searched to true to indicate that the items displayed were bc of a search 
            props.setSearched(true);
        }
        catch(error){
            console.error(error);
        }
    }
    
    function handleSearchChange(event){
        //set search term state in this file and app.jsx file to the searched term from the searchbox 
        setSearch(event.target.value);
        props.setSearchTerm(event.target.value);
    }

    return (
        //display searchbox and search button
        <div style={{display:"inline"}}>
            {
                //when searchbox content is changed, call handleSearchChange function that sets the search term states for both app.jsx and this file
            }
            <input className="input" onChange={handleSearchChange} placeholder="Search..."></input>
            {
                //when search btn is clicked, call handleSubmit function that changes giphy contents in app.jsx to gifs/stickers related to the search term
            }
            <button className="btn glow" type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchField