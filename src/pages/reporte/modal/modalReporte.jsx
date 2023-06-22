import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_reporte from '../../../services/reporte';



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
      pattern  : "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos"
    },
    rifEmpresa : {
      required : "El nombre es requerido",
      pattern  : "La primera letra del nombre debe empezar con mayúscula"
    },
    fechaEmision : {
      required : "La unidad física es requerida",
      pattern  : "Se debe ingresar solo números"
    },
    codigoOperacion:{
      required : "La tarifa es requerida",
      pattern  : "Se debe ingresar solo números"
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
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="fecha de emision"
              type="text"
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
            >
      

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
        <h3>Editar una empresa</h3>

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
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="fecha de emision"
              type="text"
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