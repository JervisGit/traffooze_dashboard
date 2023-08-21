import React from 'react';
import { Box, Typography } from '@mui/material';
import Logo from './Logo';

const SideNavHeader = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        component="a"
        href="/"
        sx={{
          display: 'inline-flex',
          height: 32,
          width: 32,
        }}
      >
      </Box>
        <div>
          <Typography color="inherit" variant="subtitle1">
            Traffooze
          </Typography>
          <Typography color="neutral.400" variant="body2">
            Dashboard
          </Typography>
          <div style={{display:'flex', marginTop:'-85px', justifyContent: 'flex-end'}}><Logo/></div>
        </div>
    </Box>
  );
};

export default SideNavHeader;
