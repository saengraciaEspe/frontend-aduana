import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonGroup, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  boxShadow: '10px 21px 610px 111px rgb(143, 143, 145) , -2px -2px 116px 111px  rgb(143, 143, 145)'
}));

const CustomizedTable = ({ 
  cols,
  rows
 }) => {

  const rowsParsed = rows.map(obj => Object.values(obj)); 

  return (
    <>
    <TableContainer component={Paper}>
      <StyledTable sx={{ minWidth: 100, }} aria-label="customized table">
        <TableHead>
          <TableRow >
            {cols.map((col, i) => (
              <StyledTableCell key={i} align="center">{ col }</StyledTableCell>
            ))}
            </TableRow>
            
        </TableHead>
        <TableBody>
          
          {rowsParsed.map((row, i) => {
        
            return (<StyledTableRow key={i} >

                  {row.map((curr, i) =>(

                    <StyledTableCell key={i} align="center">
                        { curr }
                  </StyledTableCell>
                  ) )}
              
              
              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                
                <Button> <DeleteIcon/> </Button>
                <Button>  <EditIcon/> </Button>
              </ButtonGroup>
              </StyledTableCell>
             
            </StyledTableRow>
          )})}
        </TableBody>
      </StyledTable>
    </TableContainer>

</>

    
  );
}

export default CustomizedTable;
