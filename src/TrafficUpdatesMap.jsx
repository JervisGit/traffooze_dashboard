import React from 'react';
import { useEffect, useState } from 'react';
import SideNav from './SideNav';
import UpdatesMap from './TrafficUpdates';
import Loading from './Loading';

const TrafficUpdatesMap = () => {
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
      <div style={{ flex: '1', paddingLeft: '290px', paddingTop: '20px'}}>
        <UpdatesMap></UpdatesMap>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default TrafficUpdatesMap;