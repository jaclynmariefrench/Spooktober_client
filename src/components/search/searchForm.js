import { useContext, useEffect, useState } from "react";
import { MovieTvContext } from "../movieTv/MovieTvProvider";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./search.css"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export const SimpleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist } =
    useContext(MovieTvContext);

  useEffect(() => {
    getMovieTv();
  }, []);



  useEffect(() => {
    if (searchTerm !== "") {
      const searchedTacos = movieTvs.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.subGenre.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setSearchedMovies(searchedTacos);
    } else {
      setSearchedMovies(movieTvs);
    }
  }, [searchTerm]);


  return (
    <div className="simple-search">
      <article className="searchterm">
      <Box className="search-bar"
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
          <TextField spooktober label="Type in show title or genre" id="simplesearch" 
             onChange={(e) => {
              setSearchTerm(e.target.value);
            }}/>
        </Box>
  
      {/* SEARCH TERM RESULTS */}
        <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {searchedMovies.map((sectionId) => (
                <li key={`section-${sectionId}`}>
                  <ul>
                      <ListItem key={`item-${sectionId}`}>
                        <ListItemText primary={`${sectionId.title}`} />
                      </ListItem>
                      {    sectionId.added ? (
                          <Button variant="contained" style={{backgroundColor: "red"}}
                          onClick={() => leaveWaitlist(sectionId.id)}>Leave</Button>
                          
                          ) : (
                          <Button variant="contained"
                          onClick={() => addWaitlist(sectionId.id)}>Add</Button>

                      )
                      }
                  </ul>
                </li>
              ))}
            </List>
      
        </article>
      
    </div>

  );
};









{/* <h2>Search Term Results</h2>
        {searchedMovies.map((value, key) => {
          return (
            <section key={key} className="add-to-watch">
              <h3 className="add-cal">{value.title}</h3>
              {value.added ? (
                <button
                  className="btn btn-3"
                  onClick={() => leaveWaitlist(value.id)}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="btn btn-2"
                  onClick={() => addWaitlist(value.id)}
                >
                  ADD
                </button>
              )}
            </section>
          );
        })} */}