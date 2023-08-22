import React, { useState, useEffect } from 'react';
import { FcComboChart } from "react-icons/fc";
import {AiOutlineLineChart} from 'react-icons/ai';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import flowData from './traffic_flow_statistics.json'

export const AverageFlowCard  = ({ selectedRoad }) => {
    const [averageSpeed, setAverageSpeed] = useState(null);
    const [averageJam, setAverageJam] = useState(null);

    useEffect(() => {
        if (selectedRoad) {
          const roadId = selectedRoad.road_id;
          const roadData = flowData.filter(item => item.road_id === roadId);
    
          if (roadData.length > 0) {
            setAverageSpeed(roadData[0].speed);
            setAverageJam(roadData[0].jamFactor);
          } else {
            setAverageSpeed(null);
            setAverageJam(null);
          }
        }
    }, [selectedRoad]);

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
              Average Speed
            </Typography>
            <Typography variant="h5">
                {averageSpeed !== null ? `${averageSpeed} m/s` : ''}
            </Typography>
            </Stack>
            <Stack spacing={1}>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              Average Jam Factor 
            </Typography>
            <Typography variant="h5">
              {averageJam}
            </Typography>
            </Stack>
            
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#F79009',
            }}
          >
            <SvgIcon fontSize='medium'>
              <AiOutlineLineChart />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AverageFlowCard;
