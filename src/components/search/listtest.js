import { useContext, useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { MovieTvContext } from '../movieTv/MovieTvProvider';
import Button from '@mui/material/Button';

export default function PinnedSubheaderList() {

    const { movieTvs, getMovieTv, leaveWaitlist, addWaitlist } =
    useContext(MovieTvContext);

  useEffect(() => {
    getMovieTv();
  }, []);


  return (
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
      {movieTvs.map((sectionId) => (
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
  );
}

// {searchedMovies.map((value, key) => {
//           return (
//             <section key={key} className="add-to-watch">
//               <h3 className="add-cal">{value.title}</h3>
//               {value.added ? (
//                 <button
//                   className="btn btn-3"
//                   onClick={() => leaveWaitlist(value.id)}
//                 >
//                   Leave
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-2"
//                   onClick={() => addWaitlist(value.id)}
//                 >
//                   ADD
//                 </button>
//               )}
//             </section>
//           );
//         })}