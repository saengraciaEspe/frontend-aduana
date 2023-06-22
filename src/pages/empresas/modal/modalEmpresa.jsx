import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_empresa from '../../../services/empresa';



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

const ModalEmpresa = ({ opened, fnBreaker, type, data, render, updateTable }) => {

  
  console.log(data?.rifEmpresa)

  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        rifEmpresa      :  data?.rifEmpresa,
        nombreEmpresa   :  data?.nombreEmpresa,
        paisEmpresa     :  data?.paisEmpresa,
        telefonoEmpresa :  data?.telefonoEmpresa,
        fechaEmision    :  data?.fechaEmision,
       
      }

    });

  const onAdd = async(data) => {
    console.log(data);
    await api_empresa.post(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const onUpdate = async(data) => {
    console.log(data);
    await api_empresa.put(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const errorValidMsg = {
    rifEmpresa : {
      required : "El rif es requerido",
      pattern  : "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos"
    },
    nombreEmpresa : {
      required : "El nombre es requerido",
      pattern  : "La primera letra del nombre debe empezar con mayúscula"
    },
    paisEmpresa : {
      required : "El país es requerido",
      pattern  : "El país no tiene un formato correcto"
    },
    telefonoEmpresa:{
      required : "La teléfono es requerida",
      pattern  : "El número de teléfono debe empezar con 09 seguido de 8 dígitos"
    },
    fechaEmision : {
      required : "La fecha es requerida es requerida",
      
    },
  
    
  }


  const modalType = {
    "add": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onAdd) } noValidate>
        <h3>Agregar una empresa</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="RIF"
              type="text"
              {...register('rifEmpresa',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.rifEmpresa }
               helperText = {errorValidMsg["rifEmpresa"][errors.rifEmpresa?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre de empresa"
              type="text"
              {...register('nombreEmpresa',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.nombreEmpresa }
              helperText = {errorValidMsg["nombreEmpresa"][errors.nombreEmpresa?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="País"
              type="text"
              {...register('paisEmpresa',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.paisEmpresa }
              helperText = {errorValidMsg["paisEmpresa"][errors.paisEmpresa?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Teléfono empresa'  type='text'
              {...register('telefonoEmpresa',{
                required: true,
                pattern : /^(09)\d{8}$/
              })}
              error = { !!errors.telefonoEmpresa }
              helperText = {errorValidMsg["telefonoEmpresa"][errors.telefonoEmpresa?.type]}
            >
      

            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Fecha de emisión"
              type="text"
              {...register('fechaEmision', {
                required: true,
              })}
              error = { !!errors.fechaEmision }
              helperText = {errorValidMsg["fechaEmision"][errors.fechaEmision?.type]}
            />
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
            <StyledTextField label="RIF"
              type="text"
              {...register('rifEmpresa',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.rifEmpresa }
               helperText = {errorValidMsg["rifEmpresa"][errors.rifEmpresa?.type]}
               disabled={true}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre de empresa"
              type="text"
              {...register('nombreEmpresa',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.nombreEmpresa }
              helperText = {errorValidMsg["nombreEmpresa"][errors.nombreEmpresa?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="País"
              type="text"
              {...register('paisEmpresa',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.paisEmpresa }
              helperText = {errorValidMsg["paisEmpresa"][errors.paisEmpresa?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Teléfono empresa'  type='text'
              {...register('telefonoEmpresa',{
                required: true,
                pattern : /^(09)\d{8}$/
              })}
              error = { !!errors.telefonoEmpresa }
              helperText = {errorValidMsg["telefonoEmpresa"][errors.telefonoEmpresa?.type]}
            >
      

            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Fecha de emisión"
              type="text"
              {...register('fechaEmision', {
                required: true,
              })}
              error = { !!errors.fechaEmision }
              helperText = {errorValidMsg["fechaEmision"][errors.fechaEmision?.type]}
            />
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

export default ModalEmpresa;