import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'
import SideNavHeader from './SideNavHeader'
import { Box, Button, Divider, Drawer, Stack, SvgIcon, Typography } from '@mui/material';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { MapIcon } from '@heroicons/react/24/solid'
import {AiOutlineAreaChart}from 'react-icons/ai';
import { FaTrafficLight } from 'react-icons/fa';
import { BiNavigation } from 'react-icons/bi';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';

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
      title: 'Traffic Updates',
      path: '/traffic_updates',
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
      title: 'ERP Rates',
      path: '/erp',
      icon: (
        <SvgIcon fontSize="small">
          <CurrencyDollarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Navigation',
      path: '/navigation',
      icon: (
        <SvgIcon fontSize="small">
          <BiNavigation />
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
  ];

  const styles = {
    button: {
      
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 1,
      justifyContent: 'flex-start',
      width: '100%',
      paddingLeft: '16px',
      paddingTop: '6px',
      paddingRight: '16px',
      textAlign: 'left',
    },
    hoverEffect: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
    iconContainer: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      mr: 2,
    },
    linkTitle: {
      flexGrow: 1,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '24px',
      whiteSpace: 'nowrap',
    },
    
  };

  return (
    <Drawer
      anchor="left"
      open={isDesktopOrLaptop || open}
      onClose={isDesktopOrLaptop ? undefined : onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1C2536',
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
        <SideNavHeader />
        <Divider sx={{ borderColor: '#2F3746' }} />
        <Box component="nav" sx={{  px: 2, py: 3, flexGrow: 1 }}>
          <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }} spacing={0.5}>
            {items.map((item) => (
              <li key={item.title}>
                <Button
                  sx={{
                    ...styles.link,
                    ...(item.path === window.location.pathname && {
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    }),
                    '&:hover': styles.hoverEffect,
                  }}
                  component="a"
                  href={item.path}
                >
                  {item.icon && (
                    <Box
                      component="span"
                      sx={{
                        ...styles.iconContainer,
                        color: item.path === window.location.pathname ? 'primary.main' : '#9DA4AE',
                      }}
                    >
                      {item.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: item.path === window.location.pathname ? 'common.white' : '#9DA4AE',
                      ...styles.linkTitle,
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
        <Typography color="#4D5761" variant="body2">
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
