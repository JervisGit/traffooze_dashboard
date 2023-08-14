import React from 'react';
import { useCallback, useEffect, useState } from 'react';
//import LineChart from "./components/LineChart";
import SideNav from './SideNav';
import AccountProfileDetails from './AccountDetails';
import Loading from './Loading';

const Account = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
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