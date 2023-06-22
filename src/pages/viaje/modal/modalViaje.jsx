import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_viaje from '../../../services/viaje';



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

const ModalViaje = ({ opened, fnBreaker, type, data, render, updateTable }) => {

  
  console.log(data?.codigoRuta)

  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        codigoRuta  :   data?.codigoRuta,
        paisOrigen      :   data?.paisOrigen,
        paisDestino     :   data?.paisDestino,
        puertoEntrada   :   data?.puertoEntrada,
        fechaSalida     :   data?.fechaSalida,
        fechaIngreso    :   data?.fechaIngreso
      
      }

    });

  const onAdd = async(data) => {
    console.log(data);
    await api_viaje.post(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const onUpdate = async(data) => {
    console.log(data);
    await api_viaje.put(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const errorValidMsg = {
    codigoRuta : {
      required : "El código de ruta es requerido",
      pattern  : "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos"
    },
    paisOrigen : {
      required : "El país de origen es requerido",
      pattern  : "La primera letra del país debe empezar con mayúscula"
    },
    paisDestino : {
      required : "El país de destino es requerido",
      pattern  : "La primera letra del país debe empezar con mayúscula"
    },
    puertoEntrada:{
      required : "El nombre del puerto es requerida",
      pattern  : "La primera letra del nombre del puerto debe empezar con mayúscula"
    },
    fechaSalida :{
      required : "La fecha de salida es requerida",
      
    },
    fechaIngreso :{
      required : "La fecha de ingreso es requerida",
      
    }
  }


  const modalType = {
    "add": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onAdd) } noValidate>
        <h3>Agregar una viaje</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="Código de ruta"
              type="text"
              {...register('codigoRuta',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.codigoRuta }
               helperText = {errorValidMsg["codigoRuta"][errors.codigoRuta?.type]}
           
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="País de origen"
              type="text"
              {...register('paisOrigen',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.paisOrigen }
              helperText = {errorValidMsg["paisOrigen"][errors.paisOrigen?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="País de destino"
              type="text"
              {...register('paisDestino',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                  
                })}
              error = { !!errors.paisDestino }
              helperText = {errorValidMsg["paisDestino"][errors.paisDestino?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Puerto de entrada'  type='text'
              {...register('puertoEntrada',{
                required: true,
                pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
              })}
              error = { !!errors.puertoEntrada }
              helperText = {errorValidMsg["puertoEntrada"][errors.puertoEntrada?.type]}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' 
            /* label='Fecha de salida'  */ 
            type='date' 
              {...register('fechaSalida',{
                required: true,
                
              })}
              error = { !!errors.fechaSalida }
              helperText = {errorValidMsg["fechaSalida"][errors.fechaSalida?.type] || 'Fecha de salida'}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' /* label='Fecha de ingreso'  */ type='date'
              {...register('fechaIngreso',{
                required: true,
                
              })}
              error = { !!errors.fechaIngreso }
              helperText = {errorValidMsg["fechaIngreso"][errors.fechaIngreso?.type] || 'Fecha de entrada'}
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
        <h3>Editar un viaje</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="Código de ruta"
              type="text"
              {...register('codigoRuta',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.codigoRuta }
               helperText = {errorValidMsg["codigoRuta"][errors.codigoRuta?.type]}
               disabled={true}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="País de origen"
              type="text"
              {...register('paisOrigen',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.paisOrigen }
              helperText = {errorValidMsg["paisOrigen"][errors.paisOrigen?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="País de destino"
              type="text"
              {...register('paisDestino',
                {
                  required: true,
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.paisDestino }
              helperText = {errorValidMsg["paisDestino"][errors.paisDestino?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Puerto de entrada'  type='text'
              {...register('puertoEntrada',{
                required: true,
                pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
              })}
              error = { !!errors.puertoEntrada }
              helperText = {errorValidMsg["puertoEntrada"][errors.puertoEntrada?.type]}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Fecha de salida'  type='date'
              {...register('fechaSalida',{
                required: true,
                
              })}
              error = { !!errors.fechaSalida }
              helperText = {errorValidMsg["fechaSalida"][errors.fechaSalida?.type]}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Fecha de ingreso'  type='date'
              {...register('fechaIngreso',{
                required: true,
                
              })}
              error = { !!errors.fechaIngreso }
              helperText = {errorValidMsg["fechaIngreso"][errors.fechaIngreso?.type]}
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

export default ModalViaje;