import React from 'react';
import { useCallback, useEffect, useState } from 'react';
//import LineChart from "./components/LineChart";
import SideNav from './SideNav';
import AccountProfileDetails from './AccountDetails';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa';
import { SvgIcon } from '@mui/material';
import Loading from './Loading';


const Account = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  
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
      <div style={{ flex: '1', paddingLeft: '300px', paddingTop: '50px'}}>
        <AccountProfileDetails></AccountProfileDetails>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default Account;