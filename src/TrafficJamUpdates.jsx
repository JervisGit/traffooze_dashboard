import React from 'react';
import { useEffect, useState , useMemo} from 'react';
import SideNav from './SideNav';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import TrafficJamTable from './TrafficJamTable';
import axios from 'axios';
import Loading from './Loading';

/*
const useCustomers = (data, page, rowsPerPage) => {
    return useMemo(
      () => {
        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      },
      [page, rowsPerPage]
    );
};*/

const TrafficJamUpdates = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [trafficJamData, setTrafficJamData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //const customers = useCustomers(page, rowsPerPage);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    fetchAPI();
  }, []);


  function fetchAPI() {
    axios.get('https://traffooze-flask.onrender.com/trafficjam')
      .then(response => {
        // Handle the response data here
        console.log(response.data);
        const temp_data = response.data.reverse();
        setTrafficJamData(temp_data);
      })
      .catch(error => {
        // Handle the error here
        console.error(error);
      });
  }

  //const displayedCustomers = useCustomers(trafficJamData, page, rowsPerPage);

  //console.log(displayedCustomers)
  
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '300px', paddingTop: '50px'}}>
        <TrafficJamTable></TrafficJamTable>
        <Card sx={{ p: 2 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search Traffic Jam Update"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            )}
            sx={{ maxWidth: 500 }}
          />
          <Button>
            <SvgIcon fontSize="large">
              <AdjustmentsHorizontalIcon/>
            </SvgIcon>
          </Button>
        </Card>
        <Card>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                      />
                    </TableCell>
                    <TableCell>
                      Address
                    </TableCell>
                    <TableCell>
                      Date
                    </TableCell>
                    <TableCell>
                      Time
                    </TableCell>
                    <TableCell>
                      Location
                    </TableCell>
                    <TableCell>
                      Message
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trafficJamData.map((jam) => {
                    //const isSelected = selected.includes(customer.id);
                    //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                    return (
                      <TableRow
                        hover
                        key={jam._id}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                          />
                        </TableCell>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Typography variant="subtitle2">
                              {jam.address}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {jam.date}
                        </TableCell>
                        <TableCell>
                          {jam.time}
                        </TableCell>
                        <TableCell>
                          {jam.location}
                        </TableCell>
                        <TableCell>
                          {jam.message}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          <TablePagination
            component="div"
            count={100}
            //onPageChange={onPageChange}
            //onRowsPerPageChange={onRowsPerPageChange}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default TrafficJamUpdates;