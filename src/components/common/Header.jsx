import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import assets from './../../assets/index';
import { 
  HiOutlineChevronDoubleLeft, 
  HiOutlineSearch, 
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineBell } from "react-icons/hi";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useParams } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Header() {

  const user = useSelector((state) => state.user.value)
  
  const navigate = useNavigate()

  const logout = () =>
  {
    localStorage.removeItem('token')
    navigate('/login')
  }

  
  return (
      <AppBar position="static" color="" className='appBar-menu'>
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, marginLeft: 30 }}
          >
            {/*This is a simple Menu 
             Icon wrapped in Icon */}
            <HiOutlineChevronDoubleLeft  className='icon-menu'/>
          </IconButton>
          {/* The Typography component applies 
           default font weights and sizes */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            className='input-Controllr-menu'
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="procurar pessoas, documentos, e mais"
              inputProps={{ 'aria-label': 'pesquisar' }}
              className='font-15'
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <HiOutlineSearch className='icon-menu'/>
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <HiOutlineLocationMarker className='icon-menu'/>
            </IconButton>
          </Paper> 
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 2 }}>
          </Typography>
          <div>
            {/*initivo*/}
            <IconButton>
              <HiOutlineCalendar className='icon-menu-hear'/>
            </IconButton>
            <IconButton>
              <HiOutlineChatAlt className='icon-menu-hear'/>
            </IconButton>
            <IconButton>
              <HiOutlineBell className='icon-menu-hear'/>
            </IconButton>
            {/*initivo*/}
          </div>
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
          </Typography>
            <Typography variant='body2'> {/*fontWeight='700' */}
              <p  
              className='description-name 
              description-name-user'
              >{user.username}
              </p>
              <p 
              className='description-name 
              description-name-subUser'
              >{user.username}</p>
            </Typography>
            <div className="avatar">
              <img src={assets.images.user} alt="" />
            </div>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small' />
            </IconButton>
        </Toolbar>
      </AppBar>
  );
}