import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'
import { Box, Button, Divider, Drawer, Stack, SvgIcon, Typography } from '@mui/material';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import { MapIcon } from '@heroicons/react/24/solid'
import {AiOutlineAreaChart}from 'react-icons/ai';
import { FaTrafficLight } from 'react-icons/fa';
import { BiNavigation } from 'react-icons/bi';
import Logo from './Logo';

const SideNav = ({ open, onClose }) => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })


  const items = [
    {
      title: 'Traffic Flow Forecast',
      path: '/flow',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Traffic Count Forecast',
      path: '/count',
      icon: (
        <SvgIcon fontSize="medium">
          <AiOutlineAreaChart />
        </SvgIcon>
      )
    },
    {
      title: 'Traffic Jam Updates',
      path: '/trafficjam',
      icon: (
        <SvgIcon fontSize="small">
          <FaTrafficLight />
        </SvgIcon>
      )
    },
    {
      title: 'Traffic Updates Map',
      path: '/updates_map',
      icon: (
        <SvgIcon fontSize="small">
          <MapIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Account',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Favorite Locations',
      path: '/favorite',
      icon: (
        <SvgIcon fontSize="small">
          <MapPinIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Map',
      path: '/mapcontainer',
      icon: (
        <SvgIcon fontSize="small">
          <MapIcon />
        </SvgIcon>
      )
    },
    {
      title: 'chart',
      path: '/chart',
      icon: (
        <SvgIcon fontSize="small">
          <UserPlusIcon />
        </SvgIcon>
      )
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={isDesktopOrLaptop || open}
      onClose={isDesktopOrLaptop ? undefined : onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={isDesktopOrLaptop ? undefined : { zIndex: (theme) => theme.zIndex.appBar + 100 }} 
      variant={isDesktopOrLaptop ? 'permanent' : 'temporary'}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component="a"
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32,
            }}
          >
          </Box>
        
            <div>
              <Typography color="inherit" variant="subtitle1">
                Traffooze
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Dashboard
              </Typography>
              <div style={{display:'flex', marginTop:'-85px', justifyContent: 'flex-end'}}><Logo/></div>
            </div>

        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box component="nav" sx={{  px: 2, py: 3, flexGrow: 1 }}>
          <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }} spacing={0.5}>
            {items.map((item) => (
              <li key={item.title}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 1,
                    justifyContent: 'flex-start',
                    width: '100%',
                    pl: '16px',
                    py: '6px',
                    pr: '16px',
                    textAlign: 'left',
                    ...(item.path === window.location.pathname && {
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    }),
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    },
                  }}
                  component="a"
                  href={item.path}
                >
                  {item.icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: 'center',
                        color: item.path === window.location.pathname ? 'primary.main' : 'neutral.400',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: item.path === window.location.pathname ? 'common.white' : 'neutral.400',
                      flexGrow: 1,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: '24px',
                      whiteSpace: 'nowrap',
                      fontFamily: (theme) => theme.typography.fontFamily,
                    }}
                  >
                    {item.title}
                  </Box>
                </Button>
              </li>
            ))}
          </Stack>
        </Box>
      </Box>
      <Box>
        <Typography color="neutral.600" variant="body2">
          Credit to LTA DataMall, HERE, OpenWeatherMap, Open Meteo, Lordicon
        </Typography>
      </Box>
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default SideNav;
