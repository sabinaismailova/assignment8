import './App.css';
import './styles.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchField from './components/SearchField';
import GifCard from './components/GifCard';
import FilterField from './components/FilterField';

function App(props) {
  //store and set the giphy API
  const [giphy, setGiphy] = useState([]);
  //store and set the search term which is used in SearchField.jsx and FilterField.jsx files
  const [searchTerm, setSearchTerm] = useState("");
  //stores and sets whether or noth there was a search 
  const [searched, setSearched] = useState(false);

  //used to set the api to the automatic trending gifs and stickers display
  useEffect(() =>{ 
    async function defaultDisplay(){
      try{
        //trending gifs api
        const fetchGifs = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
        //trending stickers api
        const fetchStickers = await axios.get(`https://api.giphy.com/v1/stickers/trending?api_key=ixrDFQZlIj7o5MszUeF6ByNCuYVzk7BM`);
        //store both trending gifs and stickers in one array
        let fetchGiphy = [...fetchGifs.data.data, ...fetchStickers.data.data];
        //set the giphy to the array with trending gifs and stickers to be used to display them
        setGiphy(fetchGiphy);
        //set searched to false bc this is the automatic page with trending content, not searched content
        setSearched(false);
      }
      catch(error){
        console.error(error);
      }
    }
    defaultDisplay();
  }, []);
  
  return (
    <div className="App">
      <h1 className="header glow">GIFIFY</h1>
      <form>
        {
          //use the SearchField component export to display searchbox and search button, 
          //pass in props so component is able to change giphy gifs and stickers array content and so that it can 
          //change the searched term content to the actual searched term
          //also set searched to true when search button clicked 
        }
        <SearchField giphy={giphy} setGiphy={setGiphy} setSearched={setSearched} setSearchTerm={setSearchTerm}/>
        {
          //use FilterField component export to display gifs and stickers filter options 
          // and change giphy content to just stickers or just gifs, 
          //pass in searchTerm to be used to get the correct search endpoint 
        }
        <FilterField giphy={giphy} setGiphy={setGiphy} searched={searched} searchTerm={searchTerm}/>
        <div style={{marginTop:"24px"}}>
          {
            //map each giphy content to display a gif/sticker 
          }
          {giphy && giphy.map(gif => {
            //use GifCard component export to display a gif or sticker for all content in giphy, 
            //pass in gif info like gifURL and gifSlug to use as key and value for each gif/sticker 
              return(
                <GifCard gifURL={gif.images.fixed_height.url} gifSlug={gif.slug}/>
              )})
          }
        </div>
      </form>
    </div>
  );
}

export default App;
