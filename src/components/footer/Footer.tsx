import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Avatar, BottomNavigation } from '@mui/material';
import SwBoba from '../../assets/sw_boba.svg';

export const Footer = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  }

  return (
    <Box sx={{
      width: '100%',
      bottom: 0,
      position: 'fixed',
      zIndex: '1500'
    }}>
      <BottomNavigation
        sx={{
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(158,158,158, 0.5)',
          pt: 1,
          pb: 1,
          maxHeight: '30px'
        }}
        showLabels
      >
        <Box
          sx={{
            mr: 2,
            cursor: 'pointer',
            ml: { xs: 2, sm: 10 },
            display: { xs: 'flex', md: 'flex' },
          }}>
          <Avatar 
            sx={{
              maxHeight: '20px',
              maxWidth: '20px'
            }}
            alt="Star Wars Boba" src={SwBoba} />
        </Box>
        <Typography
          variant="body1"
          noWrap
          component="a"
          onClick={handleClick}
          sx={{
            color: 'inherit',
            mr: 2,
            display: { xs: 'flex', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          SW STORE
        </Typography>
      </BottomNavigation>
    </Box>
  );
}
