import {
    Box,
    Flex,
  } from '@chakra-ui/react'

import { FaCar, FaExclamationTriangle, FaCarCrash } from 'react-icons/fa';

import {
    GoogleMap,
    Marker,
    InfoWindow,
  } from '@react-google-maps/api'
  import { useState, useEffect } from 'react'

import axios from 'axios'

import { LoadScript } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_APIKEY;

//console.log(apiKey)

//window.alert(apiKey)

const center = { lat: 1.3521, lng: 103.8198 }

const UpdatesMap = () => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [trafficUpdates, setTrafficUpdates] = useState([]);
  
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null)

    useEffect(() => {
        fetchTrafficUpdates();
      }, []);

    function fetchTrafficUpdates() {
        axios.get('https://traffooze-flask.onrender.com/traffic_icons')
          .then(response => {
            setTrafficUpdates(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error(error);
          });
    }

  
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
        if (map) {
            const markerPosition = marker === null ? center : getMarkerPosition(marker);
            map.panTo(markerPosition);
            map.setZoom(14); // Set your desired zoom level here
        }
    };
    
    const getMarkerPosition = (markerIndex) => {
        const markersData = [...trafficUpdates];
        const markerData = markersData[markerIndex];
        const [lat, lng] = markerData.location.split(',');
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
    };

    return (
        
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='95vh'
        w='80vw'
      >

        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels.icon',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            }}
            onLoad={map => setMap(map)}
          >

            

            {trafficUpdates.map(({ address, date, time, message, location, type }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index; // Store the original index

                let iconPath, fillColor;
    
                // Set icon and fill color based on the type
                if (type === "jvs_sample_trafficjam") {
                    iconPath = FaCar().props.children[0].props.d;
                    fillColor = "#ff9900";
                } else if (type === "jvs_sample_roadclosure") {
                    iconPath = FaExclamationTriangle().props.children[0].props.d;
                    fillColor = "#ffd700";
                } else if (type === "jvs_sample_roadaccident") {
                    iconPath = FaCarCrash().props.children[0].props.d;
                    fillColor = "#ff0000";
                }

                return (
                    <Marker
                        key={`trafficJam-${markerIndex}`}
                        icon={{
                            path: iconPath,
                            fillColor: fillColor,
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#ffffff",
                            scale: 0.075
                        }}
                        position={position}
                        onClick={() => handleActiveMarker(markerIndex)}
                    >
                        {activeMarker === markerIndex ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <div>Address: {address}</div>
                                    <div>Date: {date}</div>
                                    <div>Time: {time}</div>
                                    <div>{message}</div>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                );
            })}

          </GoogleMap>
          </LoadScript>
        </Box>
      </Flex>
      
    )
  }

export default UpdatesMap;