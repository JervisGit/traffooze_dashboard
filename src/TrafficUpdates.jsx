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

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

//console.log(apiKey)

//window.alert(apiKey)

const center = { lat: 1.3521, lng: 103.8198 }

const UpdatesMap = () => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [trafficJams, setTrafficJams] = useState([]);
    const [roadClosures, setRoadClosures] = useState([]);
    const [roadAccidents, setRoadAccidents] = useState([]);
  
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null)

    useEffect(() => {
        fetchTrafficUpdates();
      }, []);

    function fetchTrafficUpdates() {
        axios.get('https://traffooze-flask.onrender.com/trafficjam')
          .then(response => {
            setTrafficJams(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        axios.get('https://traffooze-flask.onrender.com/roadclosure')
          .then(response => {
            console.log(response.data);
            setRoadClosures(response.data);
          })
          .catch(error => {
            console.error(error);
            });
        axios.get('https://traffooze-flask.onrender.com/roadaccident')
          .then(response => {
            //console.log(response.data);
            setRoadAccidents(response.data);
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
        const markersData = [...trafficJams, ...roadClosures, ...roadAccidents];
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

            

            {trafficJams.map(({ address, date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index; // Store the original index

                return (
                    <Marker
                        key={`trafficJam-${markerIndex}`}
                        icon={{
                            path: FaCar().props.children[0].props.d,
                            fillColor: "#ff9900",
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

            {roadClosures.map(({ address, date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index + trafficJams.length;

                return (
                    <Marker
                        key={`roadClosure-${markerIndex}`}
                        icon={{
                            path: FaExclamationTriangle().props.children[0].props.d,
                            fillColor: "#ffd700",
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

            {roadAccidents.map(({ address, date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index + trafficJams.length + roadClosures.length;

                return (
                    <Marker
                        key={`roadClosure-${markerIndex}`}
                        icon={{
                            path: FaCarCrash().props.children[0].props.d,
                            fillColor: "#ff0000",
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