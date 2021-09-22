import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Logout } from "../auth/logout"
import { UserDetail } from "../user/UserDetail"
import { UserProvider } from "../user/UserProvider"
import "./NavBar.css"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


export const NavBar = () => {
    const history = useHistory()
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spooktober
          </Typography>
          <Button color="inherit" onClick={()=>{
             history.push("/profile")
          }}
          >Profile</Button>
          <Button color="inherit" onClick={()=>{
             history.push("/search")
          }}>Search</Button>
          <Logout/>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

