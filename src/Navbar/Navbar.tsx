import { Link, redirect, useLocation } from 'react-router-dom'
import './Navbar.css'
import React from 'react';
import { Box, List, ListDivider, ListItem, ListItemButton } from '@mui/joy';

export default function Navbar() { 
    return (
        <Box component="nav" aria-label='Currency exchanger' sx={{ flexGrow: 1, height: '4rem', display: 'flex'}}>
            <List role="menubar" orientation='horizontal'>
                <ListItem role="none">
                    <ListItemButton role="menuitem">
                        <CustomLink to="/" text='Currency exchanger'/>
                    </ListItemButton>
                </ListItem>

                <ListDivider />

                <ListItem role='none'>
                    <ListItemButton role="menuitem">
                        <CustomLink to="/exchange_rates" text='Exchange rates'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
  )
}


type CustomLink = {
    to: string,
    text: string
}

function CustomLink( { to, text }:CustomLink ) {
    const location = useLocation();
    
    function getStyle(ref: string){
        let style: React.CSSProperties = {}
        if(ref === location.pathname) {
            style.backgroundColor = "rgb(52, 255, 52)"
        }
        return style
    }

    return (
        <div>
            <div style={getStyle(to)} />
            <Link to={to} style={{
                fontFamily: "'Ubuntu', sans-serif",
                fontWeight: 300,
                fontStyle: 'normal',
                userSelect: 'none'
            }}>{text}</Link>
        </div>
    )
}
