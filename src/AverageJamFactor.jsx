import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export const AverageJamFactor = (props) => {
  const { sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          spacing={3}
          alignItems="flex-start"
          justifyContent="space-between"
          direction="row"
        >
          <Stack spacing={1}>
            <Typography
              variant="overline"
              gutterBottom
              color="text.secondary"
            >
              Average Jam Factor (Congestion Level)
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'warning.main'
            }}
          >
            <SvgIcon>
              <ExclamationCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={value * 10}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

AverageJamFactor.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
