import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_reporte from '../../../services/reporte';
import api_empresa from '../../../services/empresa';
import api_operacion from '../../../services/operacion';



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


const StyledTextField = styled(TextField)(({  }) => ({
  width: '100%'

}));

const ModalReporte = ({ opened, fnBreaker, type, data, render, updateTable }) => {

  

  const [empresas, setEmpresas] = useState([]);

  useEffect(() =>{

    const getEmpresas = async() =>{
        const data = (await api_empresa.getAll() );

        let dataParsed = data.map((curr)=>(
          {
            idEmpresa : curr._id
          }
        ))     


        setEmpresas(dataParsed);
    };

    getEmpresas();
  }, [])

  const [operaciones, setOperaciones] = useState([]);

  useEffect(() =>{

    const getOperaciones = async() =>{
        const data = (await api_operacion.getAll() );

        let dataParsed = data.map((curr)=>(
          {
            idOperacion : curr._id
          }
        ))     


        setOperaciones(dataParsed);
    };

    getOperaciones();
  }, [])
  console.log(data?.nReportes)

  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        nReportes         :   data?.nReportes,
        rifEmpresa        :   data?.rifEmpresa,
        fechaEmision      :   data?.fechaEmision,
        codigoOperacion   :   data?.codigoOperacion
      
      }

    });

  const onAdd = async(data) => {
    console.log(data);
    await api_reporte.post(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const onUpdate = async(data) => {
    console.log(data);
    await api_reporte.put(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const errorValidMsg = {
    nReportes : {
      required : "El id de partida es requerido",
      pattern  : "Se debe ingresar un id de partida, el cuál debe tener 10 dígitos"
    },
    rifEmpresa : {
      required : "El rif es requerido",
     
    },
    fechaEmision : {
      required : "La fecha de emisión es requerida",
      pattern  : "Se debe ingresar solo números"
    },
    codigoOperacion:{
      required : "La código de operación es requerida",
    
    }
  }


  const modalType = {
    "add": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onAdd) } noValidate>
        <h3>Agregar una Reporte</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="N° de reportes" 
              type="text"
              {...register('nReportes',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.nReportes }
               helperText = {errorValidMsg["nReportes"][errors.nReportes?.type]}
               disabled={false}
            >
             
            </StyledTextField>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="rif de empresa" select
            defaultValue=""
              type="text"
              {...register('rifEmpresa',
                {
                  required: true,
                
                })}
              error = { !!errors.rifEmpresa }
              helperText = {errorValidMsg["rifEmpresa"][errors.rifEmpresa?.type]}
            >
              {empresas.map((curr) => (
                <MenuItem key={curr.idEmpresa} value={curr.idEmpresa}>
                  {curr.idEmpresa}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              /* label="fecha de emision" */
              type="date"
              {...register('fechaEmision',
                {
                  required: true,
                  
                })}
                
              error = { !!errors.fechaEmision }
              helperText = {errorValidMsg["fechaEmision"][errors.fechaEmision?.type] || 'Fecha de emisión' }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' select
            label='Código de operación'  type='text'
              {...register('codigoOperacion',{
                required: true,
                
              })}
              defaultValue=""
              error = { !!errors.codigoOperacion }
              helperText = {errorValidMsg["codigoOperacion"][errors.codigoOperacion?.type]}
            >
              {operaciones.map((curr) => (
                <MenuItem key={curr.idOperacion} value={curr.idOperacion}>
                  {curr.idOperacion}
                </MenuItem>
              ))}

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button  
                      type='submit' 
                      color="primary" >Insertar</Button>
              <Button onClick={() =>{fnBreaker(!opened); render(false)}}
              >Cancelar
               </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
    ),
    "update": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onUpdate) } noValidate>
        <h3>Editar una reporte</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="N° de reportes"
              type="text"
              {...register('nReportes',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.nReportes }
               helperText = {errorValidMsg["nReportes"][errors.nReportes?.type]}
               disabled={true}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="rif de empresa"
              type="text"
              {...register('rifEmpresa',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.rifEmpresa }
              helperText = {errorValidMsg["rifEmpresa"][errors.rifEmpresa?.type]}
              disabled={true}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="fecha de emision"
              type="date"
              {...register('fechaEmision',
                {
                  required: true,
                  
                })}
              error = { !!errors.fechaEmision }
              helperText = {errorValidMsg["fechaEmision"][errors.fechaEmision?.type]}
              
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Código de operación'  type='text'
              {...register('codigoOperacion',{
                required: true,
                
              })}
              error = { !!errors.puertoEntrada }
              helperText = {errorValidMsg["codigoOperacion"][errors.codigoOperacion?.type]}
              disabled={true}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button type='submit' color="primary" >Insertar</Button>
              <Button onClick={() =>{fnBreaker(!opened); render(false);}} >Cancelar</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
    )

  }

  

  


  return (
    <Modal
      open={opened}
      onClose={fnBreaker}
    >

      {modalType[type]}

    </Modal>
  )
}

export default ModalReporte;