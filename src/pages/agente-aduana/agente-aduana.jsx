
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup,TableRow, TableHead, TableContainer,TableCell,tableCellClasses, TableBody, Table, styled, Paper,Grid, Modal} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import "./agente-aduana.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api_agente_aduana from '../../services/agente-aduanero';
import InputField from '../../components/input-field/input-field';



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

  const cols = [
    "NIT",
    "Nombre",
    "Apellido",
    "País",
    "Dirección",
    "Teléfono",
    "Acciones"
  ]


  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const fnBreakerModalAdd = () => {
    setModalAdd(!modalAdd);
  }

  const fnBreakerModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  }


  const [toSubmit, setToSubmit] = useState({
      "nitAgenteAduana" : '',
      "nombre": '',
      "apellido" : '',
      "Pais" : '',
      "direccion" :'',
      "telefono" :''
  });

  const handleChange = (e) => {

    e.preventDefault();
    setToSubmit((prev) => ({...prev, [e.target.name]:e.target.value}))
    console.log(toSubmit);

  }

  const submitAdd = async(e) =>{
    e.preventDefault();
    await api_agente_aduana.post(toSubmit);
    window.location.reload()
  }

  const sumbitUpdate = async( e ) => {
    e.preventDefault();
    console.log(toSubmit)
    await api_agente_aduana.put(
      toSubmit
    );
    window.location.reload()
  }
 
  const handleDelete = async(id) => {
  
    await api_agente_aduana.delForId(
      id
    );
    window.location.reload()
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
  
  const selectUpdateOrDelete = (data, option) => {
    setToSubmit(data);
    fnBreakerModalUpdate();
  }


  const bodyAdd = 
    (<form onSubmit = { submitAdd }>
        <h3>Agregar un agente de aduana</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <InputField label="NIT"
              type="text"
              name="nitAgenteAduana"
              onChange={handleChange}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InputField label="Nombre"
              type="text"
              name="nombre"
              onChange={handleChange}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField
              label="Apellido"
              type="text"
              name="apellido"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField id='select' label='País'  type='text'
              name="Pais"
              onChange={handleChange}
            >
            {/*  {countries.map((curr, i) =>(
              <MenuItem key={i} value={curr}>
                  {curr}
             </MenuItem>
             )) } */}

            </InputField>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField
              label="Dirección"
              type="text"
              name="direccion"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              label="Teléfono"
              type="text"
              name="telefono"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button type='submit' color="primary" >Insertar</Button>
              <Button onClick={fnBreakerModalAdd} >Cancelar</Button>
            </div>
          </Grid>
        </Grid>
      </form>)
  
  const bodyUpdate = 
  (
    <form onSubmit={sumbitUpdate }>
        <h3>Editar un agente de aduana</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <InputField label="NIT"
              type="text"
              name = "nitAgenteAduana"
              onChange={handleChange}
              value = {toSubmit.nitAgenteAduana ?? '' }
              
              disabled = {true}
            />
          
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField label="Nombre"
              type="text"
              name = "nombre"
              onChange={handleChange}
              value = {toSubmit.nombre ?? ''  }
              
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField
              label="Apellido"
              type="text"
              name = "apellido"
              onChange={handleChange}
              value = {toSubmit.apellido ?? '' }
             
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField id='pais' label='País'  type='text'
         
             name = "Pais"
             onChange={handleChange}
             value = {toSubmit.Pais ?? ''  }
          
            >
            {/*  {countries.map((curr, i) =>(
              <MenuItem key={i} value={curr}>
                  {curr}
             </MenuItem>
             )) } */}

            </InputField>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputField
              label="Dirección"
              type="text"
              name = "direccion"
              onChange={handleChange}
              value = {toSubmit.direccion ?? ''  }
             
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              label="Teléfono"
              type="text"
              name = "telefono"
              onChange={handleChange}
              value = {toSubmit.telefono ?? ''  }
        
              
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button type='submit' color="primary" >Insertar</Button>
              <Button onClick={fnBreakerModalUpdate} >Cancelar</Button>
            </div>
          </Grid>
        </Grid>
      </form>
  )


  return (
    <div className='layout'>
    <div className='item'>
    <Button className='btn' 
      onClick={(fnBreakerModalAdd)}
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
                <Button onClick={() => (selectUpdateOrDelete(
                  {nitAgenteAduana: curr._id, 
                    nombre : curr.nombre,
                    apellido:curr.apellido,
                    Pais : curr.Pais,
                    direccion : curr.direccion,
                    telefono : curr.telefono
                                        }, "update"))}>  <EditIcon/>
                </Button>
              </ButtonGroup>
              </StyledTableCell>
             
            </StyledTableRow>
          )})}
        </TableBody>
      </StyledTable>
    </TableContainer>
    

  <Modal
      open={modalAdd}
      onClose={fnBreakerModalAdd}
  >

    <div style={StyledModal}>
    { bodyAdd }
    </div>
    

  </Modal>  
  
  <Modal
      open={modalUpdate}
      onClose={fnBreakerModalUpdate}
  >

      <div style={StyledModal}>
        {bodyUpdate}
      </div>

  </Modal>  

  </div>
  )
}

export  {AgenteAduana};