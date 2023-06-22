
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper,Grid, Modal} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

;
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api_operacion from '../../services/operacion';
import ModalOperacion from './modal/modalOperacion';
import Animated from '../../components/animated/animated';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: '#579BB1',
    color: '#FFF',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

const StyledTable = styled(Table) ({
  boxShadow: '10px 21px 610px 111px rgb(143, 143, 145) , -2px -2px 116px 111px  rgb(143, 143, 145)'
});


const Operacion = () => {

  const [operaciones, setOperaciones] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() =>{

    const fetchAllOperaciones = async() =>{
        const data = await api_operacion.getAll();
        setOperaciones(data);
    };

    fetchAllOperaciones();
  }, [updateTable])



  const cols = [
    "codigoOperacion",
    "tipo",
    "estado",
    "nitAgenteAduana",
    "codigoTraslado",
    "partidaId",
    "Acciones"
  ]

  const [modalShow, setModalShow] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [type, setType] = useState('add');
  const [data, setData] = useState({});

  const fnBreakerModal = ({ data, type }) => {
    
    setModalShow(!modalShow); setType(type); setData({...data})
    setRenderModal(!renderModal)

  }
 
  const handleDelete = async(id) => {
  
    await api_operacion.delForId(
      id
    );
    setUpdateTable((prev) => !prev)
  } 

  return (
  <Animated>
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
          
          {operaciones.map((curr, i) => {
        
            return (<StyledTableRow key={i} >
                    <StyledTableCell align="center">
                        { curr._id }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.tipo }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { (curr.estado)? 'activo' : 'inactivo'  }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.nitAgenteAduana }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.codigoTraslado }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.partidaId }
                    </StyledTableCell>

              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                
                <Button onClick={() => (handleDelete( curr._id ))} > <DeleteIcon/> </Button>
                <Button onClick={() => (fnBreakerModal(
                  {data : {
                    "codigoOperacion" : curr._id,
                    "tipo":  curr.tipo,
                    "estado" : curr.estado,
                    "nitAgenteAduana" :curr.nitAgenteAduana,
                    "codigoTraslado" : curr.codigoTraslado,
                    "partidaId"     : curr.partidaId
                                        }, type : "update"}))}>  <EditIcon/>
                </Button>
              </ButtonGroup>
              </StyledTableCell>
             
            </StyledTableRow>
          )})}
        </TableBody>
      </StyledTable>
    </TableContainer>
    
    { (renderModal)?
    <ModalOperacion 
    opened      = {modalShow}
    fnBreaker   = {setModalShow}
    type        = {type}
    data        = {data}
    render      = {setRenderModal}
    updateTable = {setUpdateTable}
    /> : 
    <></>
    }

  </div>
  </Animated>
  )
}

export  { Operacion };