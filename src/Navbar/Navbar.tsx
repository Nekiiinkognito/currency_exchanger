import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import React from 'react';
import { Box, List, ListDivider, ListItem, ListItemButton } from '@mui/joy';
import DefaultCurrencyPicker from '../DefaultCurrencyPicker/DefaulCurrencyPicker';

export default function Navbar() { 
    return (
        <Box component="nav" aria-label='Currency exchanger' 
        sx={{ flexGrow: 1, height: '4rem', display: 'flex'}}>
            <List role="menubar" orientation='horizontal'>
                <ListItem role="menuitem">
                    <CustomLink to="/" text='Currency exchanger'/>
                </ListItem>

                <ListDivider />

                <ListItem role='none'>
                        <CustomLink to="/exchange_rates" text='Exchange rates'/>
                </ListItem>

                <ListItem role='none'
                sx={{
                    marginInlineStart: 'auto'
                }}>
                    Default currency: 
                        <DefaultCurrencyPicker />
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
            style.zIndex = 99
            style.height = '3px'
            style.top = '20rem'
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
