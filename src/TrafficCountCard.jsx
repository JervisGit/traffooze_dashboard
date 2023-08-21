import PropTypes from 'prop-types';
import { FaCarSide } from 'react-icons/fa';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const TrafficCountCard = (props) => {
  const { value, sx } = props;

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
              Number of Vehicles
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
            </Stack>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#6A5ACD',
            }}
          >
            <SvgIcon>
            <FaCarSide />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

TrafficCountCard.propTypes = {
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
