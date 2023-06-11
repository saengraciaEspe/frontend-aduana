
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper,Grid, Modal} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import "./agente-aduana.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api_agente_aduana from '../../services/agente-aduanero';
import ModalAgenteAduana from './modal/modalAgenteAduana';


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
        const data = await api_agente_aduana.getAll();
        setAgentesAduana(data);
    };

    fetchAllAgentesAduana();
  }, [])


  const cols = [
    "NIT",
    "Nombre",
    "Apellido",
    "País",
    "Dirección",
    "Teléfono",
    "Acciones"
  ]


  const [modalShow, setModalShow] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [type, setType] = useState('add');
  const [data, setData] = useState(undefined);

  const fnBreakerModal = ({ data, type }) => {
    const onModal = {
      "add"   : ( ) => {setModalShow(!modalShow); setType(type); setData(data); },
      "update": ( ) => {setModalShow(!modalShow); setType(type); setData(data); },
    }
    
    setModalShow(!modalShow); setType(type); setData({...data})
    setRenderModal(!renderModal)
  

  }
  const handleDelete = async(id) => {
  
    await api_agente_aduana.delForId(
      id
    );
    window.location.reload()
  } 

  return (
    <div className='layout'>
    <div className='item'>
    <Button className='btn' 
      onClick={() =>(fnBreakerModal({ data :{}, type : "add" }))}
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
          
          {agentesAduana.map((curr, i) => {
        
            return (<StyledTableRow key={i} >
                    <StyledTableCell align="center">
                        { curr._id }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.nombre }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.apellido }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.Pais }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.direccion }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.telefono }
                    </StyledTableCell>

              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                
                <Button onClick={() => (handleDelete( curr._id ))} > <DeleteIcon/> </Button>
                <Button onClick={() => (fnBreakerModal(
                  {data : {
                    nitAgenteAduana: curr._id, 
                    nombre : curr.nombre,
                    apellido:curr.apellido,
                    Pais : curr.Pais,
                    direccion : curr.direccion,
                    telefono : curr.telefono
                                        }, type: "update"}))} >  <EditIcon/>
                </Button>
              </ButtonGroup>
              </StyledTableCell>
             
            </StyledTableRow>
          )})}
        </TableBody>
      </StyledTable>
    </TableContainer>
    

{ (renderModal)? <ModalAgenteAduana 
    opened = {modalShow}
    fnBreaker = {setModalShow}
    type = {type}
    data = {data}
    render = {setRenderModal}
  >

  </ModalAgenteAduana> : <></>}
  </div>
  )
}

export  {AgenteAduana};