import React from 'react';
import { useEffect, useState } from 'react';
import SideNav from './SideNav';
import { 
    Unstable_Grid2 as Grid, 
  } from '@mui/material';
import { AverageSpeed } from './AverageSpeed';
import { AverageJamFactor } from './AverageJamFactor';
import ForecastChart from './ForecastChart';
import Logo from './Logo';
import Loading from './Loading';

const TrafficFlowForecast = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);


  const sampleChartSeries = [
    {
      name: 'Speed',
      data: [12, 25, 18, 30, 20, 35, 28, 40, 33, 45, 40, 50]
    }
  ];
  
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '300px', paddingTop: '50px'}}>
      <Grid xs={12} sm={6} lg={3}>
        <AverageSpeed
            difference={12}
            positive
            sx={{ height: '100%' }}
            value="2.1248"
        />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
        <AverageJamFactor
            value={1.5}
            sx={{ height: '100%' }}
        />
        </Grid>
        <ForecastChart chartSeries={sampleChartSeries} sx={{ height: '100%' }}/>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default TrafficFlowForecast;