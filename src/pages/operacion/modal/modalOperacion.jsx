import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
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

const ModalOperacion = ({ opened, fnBreaker, type, data, render, updateTable }) => {

  
  console.log(data?.codigoOperacion)

  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        codigoOperacion   :   data?.codigoOperacion,
        tipo              :   data?.tipo,
        estado            :   data?.estado,
        nitAgenteAduana   :   data?.nitAgenteAduana,
        codigoTraslado    :   data?.codigoTraslado,
        partidaId         :   data?.partidaId
      
      }

    });

  const onAdd = async(data) => {
    console.log(data);
    await api_operacion.post(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const onUpdate = async(data) => {
    console.log(data);
    await api_operacion.put(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const errorValidMsg = {
    codigoOperacion : {
      required : "El id de partida es requerido",
      pattern  : "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos"
    },
    tipo : {
      required : "El nombre es requerido",
      pattern  : "La primera letra del nombre debe empezar con mayúscula"
    },
    estado : {
      required : "La unidad física es requerida",
      pattern  : "Se debe ingresar solo números"
    },
    nitAgenteAduana:{
      required : "La tarifa es requerida",
      pattern  : "Se debe ingresar solo números"
    },
    codigoTraslado:{
      required : "La tarifa es requerida",
      pattern  : "Se debe ingresar solo números"
    },
    partidaId:{
      required : "La tarifa es requerida",
      pattern  : "Se debe ingresar solo números"
    }
  }


  const modalType = {
    "add": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onAdd) } noValidate>
        <h3>Agregar una Operación</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="Código de operación"
              type="text"
              {...register('codigoOperacion',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.codigoOperacion }
               helperText = {errorValidMsg["codigoOperacion"][errors.codigoOperacion?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Tipo"
              type="text"
              {...register('tipo',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.tipo }
              helperText = {errorValidMsg["tipo"][errors.tipo?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Estado"
              type="text"
              {...register('estado',
                {
                  required: true,
                  
                })}
              error = { !!errors.estado }
              helperText = {errorValidMsg["estado"][errors.estado?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="nit Agente de Aduana"
              type="text"
              {...register('nitAgenteAduana',
                {
                  required: true,
                  
                })}
              error = { !!errors.nitAgenteAduana }
              helperText = {errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Código de traslado'  type='text'
              {...register('codigoTraslado',{
                required: true,
                
              })}
              error = { !!errors.codigoTraslado }
              helperText = {errorValidMsg["codigoTraslado"][errors.codigoTraslado?.type]}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Partida de Id'  type='text'
              {...register('partidaId',{
                required: true,
                
              })}
              error = { !!errors.partidaId }
              helperText = {errorValidMsg["partidaId"][errors.partidaId?.type]}
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
            <StyledTextField label="Código de operación"
              type="text"
              {...register('codigoOperacion',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.codigoOperacion }
               helperText = {errorValidMsg["codigoOperacion"][errors.codigoOperacion?.type]}
               disabled={true}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Tipo"
              type="text"
              {...register('tipo',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.tipo }
              helperText = {errorValidMsg["tipo"][errors.tipo?.type]}
            />
          
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField label="Estado"
              type="text"
              {...register('estado',
                {
                  required: true,
                  
                })}
              error = { !!errors.estado }
              helperText = {errorValidMsg["estado"][errors.estado?.type]}
            />
          
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField
              label="nit Agente de Aduana"
              type="text"
              {...register('nitAgenteAduana',
                {
                  required: true,
                  
                })}
              error = { !!errors.nitAgenteAduana }
              helperText = {errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Código de traslado'  type='text'
              {...register('codigoTraslado',{
                required: true,
                
              })}
              error = { !!errors.codigoTraslado }
              helperText = {errorValidMsg["codigoTraslado"][errors.codigoTraslado?.type]}
            >
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Partida de Id'  type='text'
              {...register('partidaId',{
                required: true,
                
              })}
              error = { !!errors.partidaId }
              helperText = {errorValidMsg["partidaId"][errors.partidaId?.type]}
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

export default ModalOperacion;