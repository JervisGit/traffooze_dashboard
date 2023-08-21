import React from 'react';
import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import ApexChart from 'react-apexcharts';

const ForecastChart = (props) => {
  const { chartSeries, timestamps, trafficCount, sx } = props;
  const theme = useTheme();
  
  const title = trafficCount ? 'Traffic Count Forecast' : 'Traffic Flow Forecast';
  const chartType = trafficCount ? 'bar' : 'line';

  const handleRefreshClick = () => {
    window.location.reload(); // Reload the page
  };

  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      categories: timestamps,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
            onClick={handleRefreshClick}
          >
            Refresh
          </Button>
        )}
        title={title}
      />
      <CardContent>
        <ApexChart
          options={chartOptions}
          series={chartSeries}
          type={chartType}
          height={350}
          width="100%"
        />
      </CardContent>
      <Divider />
    </Card>
  );
};

ForecastChart.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};

export default ForecastChart;
