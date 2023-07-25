import { TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper} from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({

}));;

export const  StyledTableHead = styled(TableHead)(({ theme }) => ({

}));;

export const  StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    
}));;

export const  StyledTableBody = styled(TableBody)(({ theme }) => ({
    
}));;



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: '#579BB1',
    color: '#FFF',
  
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&': {
    backgroundColor: 'rgb(187, 209, 220)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },

  '&:hover':{
    backgroundColor : '#C9ECF8'
  }
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  boxShadow: '10px 21px 610px 111px rgb(143, 143, 145) , -2px -2px 116px 111px  rgb(143, 143, 145)'
}));
