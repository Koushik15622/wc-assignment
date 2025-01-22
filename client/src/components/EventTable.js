import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../assets/CustomButton.css'; // Import the CSS file for custom button styles

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#000000',
    color: theme.palette.common.white,
    fontFamily: 'Quicksand',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Quicksand',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EventTable = ({ events }) => {
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToday = () => {
    setFilterDate(new Date().toISOString().split('T')[0]);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFilterDate(tomorrow.toISOString().split('T')[0]);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.start.dateTime || event.start.date).toISOString().split('T')[0];
    const matchesDate = filterDate ? eventDate === filterDate : true;
    const matchesSearch = event.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#ffa500' }}>
        <TextField
          label="Search by Event Name"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flexGrow: 1, marginRight: '16px', fontFamily: 'Quicksand' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffa500' }}>
          <TextField
            label="Filter by Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ fontFamily: 'Quicksand'}}
          />
          <Button variant="contained" onClick={handleToday} className="custom-button" style={{ marginLeft: '8px', backgroundColor: '#ffffff', color: 'black', fontFamily: 'Quicksand' }}>
            Today
          </Button>
          <Button variant="contained" onClick={handleTomorrow} className="custom-button" style={{ marginLeft: '8px', backgroundColor: '#ffffff', color: 'black', fontFamily: 'Quicksand' }}>
            Tomorrow
          </Button>
        </div>
      </div>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{ fontFamily: 'Quicksand' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Event</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEvents.map((event, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {event.summary || "No Title"}
              </StyledTableCell>
              <StyledTableCell>
                {new Date(event.start.dateTime || event.start.date).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>
                {new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}
              </StyledTableCell>
              <StyledTableCell>
                {event.location || "No Location"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;