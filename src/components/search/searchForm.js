import React, { useContext, useEffect, useState } from "react";
import { MovieTvContext } from "../movieTv/MovieTvProvider";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./search.css"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SimpleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                        {/* put link here */}
                        <ListItemButton onClick={
                                            ()=> {
                                                handleOpen()
                                            }
                                        }>{`${sectionId.title}`}</ListItemButton>
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
        <div className="popup">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
        >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Does this work?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
                    Stuff in here. 
                    </Typography>
                </Box>
        </Modal>
    </div>
      
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