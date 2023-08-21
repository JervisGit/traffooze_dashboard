import React, { useState, useEffect } from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import { FcComboChart } from "react-icons/fc"
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import countData from './vehicle_count_statistics.json'

export const AverageCountCard  = ({ selectedCamera }) => {
    const [averageCount, setAverageCount] = useState(null);
    const [maxCount, setMaxCount] = useState(null);

    useEffect(() => {
        if (selectedCamera) {
          const cameraId = selectedCamera.camera_id;
          const cameraData = countData.filter(item => item.Camera_ID === cameraId);
    
          if (cameraData.length > 0) {
            setAverageCount(cameraData[0].Average_Vehicle_Count);
            setMaxCount(cameraData[0].Max_Vehicle_Count);
          } else {
            setAverageCount(null);
            setMaxCount(null);
          }
        }
    }, [selectedCamera]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack
          spacing={3}
          justifyContent="space-between"
          direction="row"
          alignItems="flex-start"
        >
          
          <Stack spacing={1}>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              Average Vehicles Count
            </Typography>
            <Typography variant="h5">
              {averageCount}
            </Typography>
            </Stack>
            <Stack spacing={1}>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              Record Highest
            </Typography>
            <Typography variant="h5">
              {maxCount}
            </Typography>
            </Stack>
            
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'white',
              border: '3px solid #6A5ACD',
            }}
          >
            <SvgIcon fontSize='medium'>
              <FcComboChart/>
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AverageCountCard;
