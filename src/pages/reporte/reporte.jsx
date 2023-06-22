
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper,Grid, Modal} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

;
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api_reporte from '../../services/reporte';

import ModalReporte from './modal/modalReporte';
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

const StyledTable = styled(Table)(({ theme }) => ({
  boxShadow: '10px 21px 610px 111px rgb(143, 143, 145) , -2px -2px 116px 111px  rgb(143, 143, 145)'
}));


const Reporte = () => {

  const [reportes, setReportes] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() =>{

    const fetchAllReportes = async() =>{
        const data = await api_reporte.getAll();
        setReportes(data);
    };

    fetchAllReportes();
  }, [updateTable])


  const cols = [
    "nReportes",
    "rifEmpresa",
    "fechaEmision",
    "codigoOperacion",
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
  
    await api_reporte.delForId(
      id
    );
    setUpdateTable((prev) => !prev)
  } 


  /* const rowsParsed = rows.map(obj => Object.values(obj));  */
  const StyledModal = {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    top: '50%',
    left: '50%',
    bgcolor: 'background.paper',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    transform: 'translate(-50%, -50%)',
  
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
          
          {reportes.map((curr, i) => {
        
            return (<StyledTableRow key={i} >
                    <StyledTableCell align="center">
                        { curr._id }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.rifEmpresa }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.fechaEmision }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        { curr.codigoOperacion }
                    </StyledTableCell>
                  

              <StyledTableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                
                <Button onClick={() => (handleDelete( curr._id ))} > <DeleteIcon/> </Button>
                <Button onClick={() => (fnBreakerModal(
                 { data : {
                    "nReportes" : curr._id,
                    "rifEmpresa":  curr.rifEmpresa,
                    "fechaEmision" : curr.fechaEmision,
                    "codigoOperacion" :curr.codigoOperacion,
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
    <ModalReporte 
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

export  { Reporte };