import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles.css"

function SearchField(props) {
    const [search, setSearch] = useState("");

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const fetchGifs = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            const fetchStickers = await axios.get(`http://api.giphy.com/v1/stickers/search?q=${search}&api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
            let fetchGiphy = [...fetchGifs.data.data,  ...fetchStickers.data.data];
            props.setGiphy(fetchGiphy);
            props.setSearched(true);
        }
        catch(error){
            console.error(error);
        }
    }
    
    function handleSearchChange(event){
        setSearch(event.target.value);
        props.setSearchTerm(event.target.value);
    }

    return (
        <div style={{display:"inline"}}>
            <input className="input" onChange={handleSearchChange} placeholder="Search..."></input>
            <button className="btn glow" type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchField