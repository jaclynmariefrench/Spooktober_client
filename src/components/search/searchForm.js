import React, { useContext, useEffect, useState } from "react";
import { MovieTvContext } from "../movieTv/MovieTvProvider";
import { MovieDetailContext } from "../movieDetails/movieDetailProvider"
import { MovieApiDetail } from "../movieDetails/movieDetail"

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
  const [selectedMovie, setSelectedMovie ] = useState({})

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist } =
    useContext(MovieTvContext);
  const { searchTerms, setSearchTerms, getMovieBySearch } = useContext(MovieDetailContext)

  useEffect(() => {
    getMovieTv();
  }, []);

  useEffect(() => {
    getMovieBySearch();
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
        {/* MOVIE TITLE CLICKABLE */}
        <ListItemButton
          onClick={() => {
            setSelectedMovie(sectionId);
            getMovieBySearch(sectionId.title);
            handleOpen();
          }}
        >
          {`${sectionId.title}`}
        </ListItemButton>
      </ListItem>
      {sectionId.added ? (
        <Button
        variant="contained"
        style={{ backgroundColor: "red" }}
        onClick={() => {
          leaveWaitlist(sectionId.id).then(() => {
            // Update the 'added' property immediately after removing from waitlist
            const updatedSearchedMovies = searchedMovies.map((movie) => {
              if (movie.id === sectionId.id) {
                return { ...movie, added: false };
              }
              return movie;
            });
            setSearchedMovies(updatedSearchedMovies);
          });
        }}
      >
        Leave
      </Button>
      ) : (
        <Button
  variant="contained"
  onClick={() => {
    addWaitlist(sectionId.id).then(() => {
      // Update the 'added' property immediately after adding to waitlist
      const updatedSearchedMovies = searchedMovies.map((movie) => {
        if (movie.id === sectionId.id) {
          return { ...movie, added: true };
        }
        return movie;
      });
      setSearchedMovies(updatedSearchedMovies);
    });
  }}
>
  Add
</Button>
      )}
    </ul>
  </li>
))}

            </List>
      
        </article>
        {/* MOVIE API DETAIL MODAL */}
        <div className="popup">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
        >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`${selectedMovie?.title}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
                        <MovieApiDetail/>
                    </Typography>
                </Box>
        </Modal>
    </div>
      
    </div>

  );
};








