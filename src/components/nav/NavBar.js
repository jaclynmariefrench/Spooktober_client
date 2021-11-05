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
import { Icon } from "@mui/material"
import SpooktoberIcon from '../pictures/GHOST_ICON.png'


export const NavBar = () => {
    const history = useHistory()
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#3E1D33"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          style={{fontFamily: "Nosifer Caps"}}>
            Spooktober
          <Icon style={{width: "60px", height: "36px"}}>
            <img src={SpooktoberIcon} height={40} width={40}/>
          </Icon>
          </Typography>
          
          <Button color="inherit" onClick={()=>{
             history.push("/profile")
          }}
          >Profile</Button>
          <Button color="inherit" onClick={()=>{
             history.push("/search")
          }}>Search</Button>
          <Button color="inherit" onClick={()=>{
            history.push("/advanced-search")
          }}>Advanced Search</Button>
          <Button color="inherit" onClick={()=>{
            history.push("/moviedetail")
          }}>Movie Detail</Button>
          <Logout/>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

