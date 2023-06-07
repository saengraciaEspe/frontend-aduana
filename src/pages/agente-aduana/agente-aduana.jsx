
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalAgenteAduana from './modal/modalAgenteAduana';
import "./agente-aduana.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { get } from '../../services/agente-aduanero';


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


const AgenteAduana = () => {

  const [agentesAduana, setAgentesAduana] = useState([]);
  
  useEffect(() =>{

    const fetchAllAgentesAduana = async() =>{
      try{
        const data = await get();
        setAgentesAduana(data);
      }catch(error){
        console.log(error);
      }
    }
    

  }, [])



  const rows = [
    {
      nombre : 'Akagami',
      apellido : 'Sanz',
      pais      : 'Ecuador',
      direccion : 'Sto Dgo',
      telefono  : '09042842',
    },
    {
      nombre : 'Monkey ',
      apellido : 'D Luffy',
      pais      : 'Japón',
      direccion : 'Tokio',
      telefono  : '093422346',
    },
    { 
      nombre : 'Ichigo',
      apellido : 'Kurosaki',
      pais      : 'China',
      direccion : 'Xixiang',
      telefono  : '09442145',
    },
  ];

  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [agenteToEdit, setAgenteToEdit ] = useState({
    nombre : "",
    apellido: "",
    pais: "",
    direccion : "",
    telefono : ""
  });

  const openModal = (option, data) => {
   
    setModalType(option);
    setOpened(true);
    setAgenteToEdit({
      nombre : data?.nombre,
      apellido: data?.apellido,
      pais: data?.pais,
      direccion : data?.direccion,
      telefono : data?.telefono
    });
   
  }

  const breaker = () =>{
    setOpened(!opened)
  }


  /* const rowsParsed = rows.map(obj => Object.values(obj));  */

  

  return (
    <div className='layout'>
    <div className='item'>
    <Button className='btn' 
      onClick={(e) =>{ return openModal('add', {})}}
      variant="contained" 
      startIcon={<AddCircleIcon/>}> 
      Insertar</Button>
    </div>
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
          
          {rows.map((curr, i) => {
        
            return (<StyledTableRow key={i} >

                    <StyledTableCell align="center">
                        { curr.nombre }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.apellido }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.pais }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.direccion }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.telefono }
                    </StyledTableCell>

              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                
                <Button> <DeleteIcon/> </Button>
                <Button onClick={(e) => {  return openModal('update', curr)} }>  <EditIcon/> </Button>
              </ButtonGroup>
              </StyledTableCell>
             
            </StyledTableRow>
          )})}
        </TableBody>
      </StyledTable>
    </TableContainer>
    

  <ModalAgenteAduana
    opened={opened}
    fnBreaker={breaker}
    type={modalType}
    data = {agenteToEdit}
  />

  </div>
  )
}

export default AgenteAduana;