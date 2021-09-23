import { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MovieTvContext } from '../movieTv/MovieTvProvider';
import { SearchContext } from './searchProvider';
import "./search.css"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export default function BasicSelect() {

  const [eraSelect, setEra] = useState({ id: 0 });
  const [spiritSelect, setSpirit] = useState({ id: 0 });
  const [dropDownMovies, setDropDown ] = useState([])

  const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist, getUserWaitlist } =
    useContext(MovieTvContext);
  const { getEras, eraList, spiritList, getSpirits } =
    useContext(SearchContext);

    useEffect(() => {
        getMovieTv();
      }, []);
    useEffect(() => {
        getUserWaitlist();
    }, []);
    
      useEffect(() => {
        getEras();
      }, []);
    
      useEffect(() => {
        getSpirits();
      }, []);
      
    useEffect(() => {
    if (eraSelect > 0 || spiritSelect > 0) {
        const searchedTacos = movieTvs.filter((movie) =>
        movie.era.id === eraSelect ||
        movie.spirit.id === spiritSelect
        );
        setDropDown(searchedTacos);
    } else {
        setDropDown(movieTvs);
    }
    }, [ eraSelect, spiritSelect]);

  const handleEra = (era) => {
    setEra(era.target.value);
  };

  const handleSpirit = (spirit) => {
    setSpirit(spirit.target.value);
  };

  return (
      <>
    <div className="drop-boxes">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">What's the era?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eraSelect}
            label="era"
            onChange={handleEra}
          >
          {eraList.map((m) => (
              <MenuItem key={m.id} value={m.id}>
              {m.label}
              </MenuItem>
          ))}
          </Select>
        </FormControl>
      </Box>
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">What's the spirit?</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={spiritSelect}
        label="spirit"
        onChange={handleSpirit}
        >
       {spiritList.map((m) => (
         <MenuItem key={m.id} value={m.id}>
                {m.label}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  </Box>
  </div>
  <fieldset className="searchtermlist">
        <h2>Dropdown Results</h2>
        <List
              sx={{
                width: '200%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {dropDownMovies.map((sectionId) => (
                <li key={`section-${sectionId}`} >
                  <ul className="list-item">
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
      </fieldset>
  </>
  );
}

