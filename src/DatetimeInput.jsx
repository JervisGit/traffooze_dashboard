import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
//import DateTimePicker from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const today = dayjs();
const tomorrow = dayjs().add(5, 'day');

function DateTimeInput() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    window.alert(selectedDate);
  };

  //const minDate = new Date();
  //const maxDate = new Date('2023-12-31');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select Date and Time"
        minDateTime={today}
        maxDate={tomorrow}
        //minDateTime={minDate}
        //maxDateTime={maxDate}
      />
      </LocalizationProvider>
  );
}

export default DateTimeInput;
