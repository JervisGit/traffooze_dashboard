import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from './SideNav';
import { 
    Button,
    TextField, 
    Unstable_Grid2 as Grid, 
    Autocomplete, 
  } from '@mui/material';
import { TrafficFlowCard } from './TrafficFlowCard';
import { AverageFlowCard } from './AverageFlowCard';
import ForecastChart from './ForecastChart';
import dayjs from 'dayjs';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMediaQuery } from 'react-responsive';
import { FaBars } from 'react-icons/fa';
import { SvgIcon } from '@mui/material';
import Loading from './Loading';
import { filter } from '@chakra-ui/react';

const TrafficFlowForecast = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [roads, setRoads] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [selectedDatetime, setSelectedDatetime] = useState(null);
  const [forecastTimestamp, setForecastTimestamp] = useState([]);
  const [forecastSpeed, setForecastSpeed] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const today = dayjs();
  const tomorrow = dayjs().add(4, 'day').set('hour', 23).set('minute', 50);

  useEffect(() => {
    
    setIsLoading(true);
    setForecastSpeed(sampleChartSeries);
    fetchMetadata();

  }, []);

  function fetchMetadata() {
    axios.get('https://traffooze-flask.onrender.com/metadata')
      .then(response => {
        //console.log(response.data);
        setRoads(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
const handleGenerateForecast = () => {

    setIsLoading(true);

    if (selectedRoad && selectedDatetime) {
      const roadId = selectedRoad.road_id;
      const formattedDate = selectedDatetime.format('YYYY-MM-DD HH:mm:ss');

      const requestData = {
        road_id: roadId,
        timestamp: formattedDate,
      };

      console.log("datetime:", requestData);
  
      axios.post('https://traffooze-flask.onrender.com/get_traffic_flow', requestData)
        .then(response => {
          // Handle the response here if needed
          console.log("Forecast generated successfully:", response.data);

          const forecastSpeed = response.data.speed;
          const forecastJamfactor = response.data.jamFactor;
          const forecastTimestamps = response.data.timestamp;

          const forecastSeries = [
            {
              name: 'Speed (m/s)',
              data: forecastSpeed,
            },
            {
              name: 'Jam Factor',
              data: forecastJamfactor,
            }
          ];

          setForecastSpeed(forecastSeries);
          setForecastTimestamp(forecastTimestamps);
          

          setIsLoading(false);
        })
        .catch(error => {
          // Handle errors
          console.error("Error generating forecast:", error);
        });
    } else {
      // Handle the case where either the road or datetime is not selected
      console.log("Please select a road and datetime.");
    }
  };


  const sampleChartSeries = [
    {
      name: 'Speed',
      data: [0, 25, 18, 30, 20, 35, 28, 40, 33, 45, 40, 50]
    },
    {
      name: 'Jam Factor',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  const filteredRoads = roads.filter(road => road.description !== "12");
  
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
      <Grid container spacing={3}>
      <Grid xs={12} sm={6} lg={5}>
        <TrafficFlowCard
            sx={{ height: '100%' }}
            value={forecastSpeed.length > 0 ? forecastSpeed[0].data[0] : null}
            jam={forecastSpeed.length > 0 ? forecastSpeed[1].data[0] : null}
        />
        </Grid>
        <Grid xs={12} sm={6} lg={5}>
         <AverageFlowCard selectedRoad={selectedRoad} />
        </Grid>
        <Grid
            xs={12}
            lg={4}>
          <Autocomplete
            options={filteredRoads}
            getOptionLabel={(road) => road.description}
            renderInput={(params) => <TextField {...params} label="Select a road" />}
            isOptionEqualToValue={(option, value) => option.road_id === value.road_id}
            onChange={(event, newValue) => setSelectedRoad(newValue)}
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
          <ForecastChart chartSeries={forecastSpeed || sampleChartSeries} timestamps={forecastTimestamp} sx={{ height: '100%'}}/>
        </Grid>
        </Grid>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default TrafficFlowForecast;