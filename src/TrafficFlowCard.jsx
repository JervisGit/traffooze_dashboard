import PropTypes from 'prop-types';
import { FaTachometerAlt } from 'react-icons/fa';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const TrafficFlowCard = (props) => {
  const { value, sx, jam } = props;

  return (
    <Card sx={sx}>
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
              Speed
            </Typography>
            <Typography variant="h4">
              {value} m/s
            </Typography>
          </Stack>
          <Stack spacing={1}>
          <Typography
              variant="overline"
              color="text.secondary"
            >
              Jam Factor
            </Typography>
            <Typography variant="h4">
            {jam}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: jam <= 3 ? '#4CAF50' : jam <= 7 ? '#FFC107' : '#F44336',
            }}
          >
            <SvgIcon>
              <FaTachometerAlt />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

TrafficFlowCard.propTypes = {
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
