import React from 'react';
import { useEffect, useState } from 'react';
import SideNav from './SideNav';
import UpdatesMap from './TrafficUpdates';

const TrafficUpdatesMap = () => {
  const [openNav, setOpenNav] = useState(true);
  
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '290px', paddingTop: '20px'}}>
        <UpdatesMap></UpdatesMap>
      </div>
    </div>
    </div>
  );
};

export default TrafficUpdatesMap;