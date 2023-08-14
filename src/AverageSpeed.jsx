import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { FaTachometerAlt } from 'react-icons/fa';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const AverageSpeed = (props) => {
  const { value, positive = false, difference, sx } = props;

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
              Average Speed 30 days
            </Typography>
            <Typography variant="h4">
              {value} 
            </Typography>
          </Stack>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'error.main',
            }}
          >
            <SvgIcon>
              <FaTachometerAlt />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            sx={{ mt: 2 }}
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <Stack
              spacing={0.5}
              direction="row"
              alignItems="center"
            >
              <SvgIcon
                fontSize="small"
                color={positive ? 'success' : 'error'}
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                variant="body2"
                color={positive ? 'success.main' : 'error.main'}
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

AverageSpeed.propTypes = {
  value: PropTypes.string.isRequired,
  positive: PropTypes.bool,
  difference: PropTypes.number,
  sx: PropTypes.object,
};
