import React from 'react';
import { useEffect, useState } from 'react';
import SideNav from './SideNav';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa';
import { SvgIcon } from '@mui/material';
import UpdatesMap from './TrafficUpdates';

const TrafficUpdatesMap = () => {
  const [openNav, setOpenNav] = useState(true);
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      {!isDesktopOrLaptop && (
                        <button
                          style={{
                            display: 'block', // Display only on small screens
                            padding: '10px',
                            position: 'fixed',
                            zIndex: 9999,
                            top: 10,
                            left: 10,
                            height: 46,
                            backgroundColor: '#6A5ACD',
                            borderRadius: '5px',
                            borderColor: 'white'
                          }}
                          onClick={() => setOpenNav(!openNav)}
                        >
                          <SvgIcon fontSize='medium'>
                          <FaBars color='white'/>
                          </SvgIcon>
                        </button>
                      )}
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '290px', paddingTop: '20px'}}>
        <UpdatesMap></UpdatesMap>
      </div>
    </div>
    </div>
  );
};

export default TrafficUpdatesMap;