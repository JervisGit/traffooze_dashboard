import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from './SideNav';
import { 
    Card,
    TextField, 
    Unstable_Grid2 as Grid, 
    Autocomplete,
    Button, 
  } from '@mui/material';
import { TrafficCountCard } from './TrafficCountCard';
import { AverageJamFactor } from './AverageJamFactor';
import ForecastChart from './ForecastChart';
import DateTimeInput from './DatetimeInput';
import dayjs from 'dayjs';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Loading from './Loading';

const TrafficCountForecast = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedDatetime, setSelectedDatetime] = useState(null);
  const [forecastTimestamp, setForecastTimestamp] = useState([]);
  const [forecastCount, setForecastCount] = useState([]);

  const today = dayjs();
  const tomorrow = dayjs().add(5, 'day').set('hour', 23).set('minute', 50);

  useEffect(() => {
    
    setIsLoading(true);
    setForecastCount(sampleChartSeries);
    import('./camera_metadata.json')
      .then((data) => {
        setCameras(data.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading cameras JSON:', error);
      });

  }, []);

  const handleGenerateForecast = () => {

    setIsLoading(true);

    if (selectedCamera && selectedDatetime) {
      const cameraId = selectedCamera.camera_id;
      const formattedDate = selectedDatetime.format('YYYY-MM-DD HH:mm:ss');

      console.log("datetime: ", formattedDate);

      const requestData = {
        camera_id: cameraId,
        timestamp: formattedDate,
      };
  
      axios.post('https://traffooze-flask.onrender.com/get_traffic_count', requestData)
        .then(response => {
          // Handle the response here if needed
          console.log("Forecast generated successfully:", response.data);

          const forecastCount = response.data.count;
          const forecastTimestamps = response.data.timestamp;

          const forecastSeries = [
            {
              name: 'Vehicles count',
              data: forecastCount,
            }
          ];

          setForecastCount(forecastSeries);
          setForecastTimestamp(forecastTimestamps);
          

          setIsLoading(false);
        })
        .catch(error => {
          // Handle errors
          console.error("Error generating forecast:", error);
        });
    } else {
      // Handle the case where either the road or datetime is not selected
      console.log("Please select a camera and datetime.");
    }
  };

  const sampleChartSeries = [
    {
      name: 'Vehicles count',
      data: [12, 25, 18, 30, 20, 35, 28, 40, 33, 45, 40, 50]
    }
  ];
  
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '300px', paddingTop: '50px'}}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={5}>
            <TrafficCountCard
                sx={{ height: '100%' }}
                value={forecastCount.length > 0 ? forecastCount[0].data[0] : null}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={5}>
          </Grid>
          
            <Grid xs={12} lg={4}>
                <Autocomplete
                    options={cameras}
                    getOptionLabel={(camera) => camera.label}
                    renderInput={(params) => <TextField {...params} label="Select a camera" />}
                    isOptionEqualToValue={(option, value) => option.camera_id === value.camera_id}
                    onChange={(event, newValue) => setSelectedCamera(newValue)}
                />
            </Grid>
            <Grid xs={12} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date and Time"
                  minDateTime={today}
                  maxDateTime={tomorrow}
                  onChange={(datetime) => setSelectedDatetime(datetime)}
                />
                </LocalizationProvider>
            </Grid>
            <Grid xs={12} lg={4} sx={{ p:2 }}>
              <Button variant='contained' onClick={handleGenerateForecast}>Generate Forecast</Button>
            </Grid>
          <Grid
              xs={12}
              lg={10}>
            <ForecastChart chartSeries={forecastCount || sampleChartSeries} timestamps={forecastTimestamp} sx={{ height: '100%'}}/>
          </Grid>
        </Grid>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default TrafficCountForecast;