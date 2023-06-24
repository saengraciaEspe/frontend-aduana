import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel,InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_producto from '../../../services/empresa';



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

const ModalProducto = ({ opened, fnBreaker, type, data, render, updateTable }) => {

  
  console.log(data?.partidaId)

  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        partidaId       :  data?.partidaId,
        nombre          :  data?.nombre,
        unidadFisica     :  data?.unidadFisica,
        tarifaAdvalorem :  data?.tarifaAdvalorem,
      
      }

    });

  const onAdd = async(data) => {
    console.log(data);
    await api_producto.post(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const onUpdate = async(data) => {
    console.log(data);
    await api_producto.put(data);
    updateTable((prev) => !prev)
    fnBreaker(!opened); render(false); 
  }

  const errorValidMsg = {
    partidaId : {
      required : "El id de partida es requerido",
      pattern  : "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos"
    },
    nombre : {
      required : "El nombre es requerido",
      pattern  : "La primera letra del nombre debe empezar con mayúscula"
    },
    unidadFisica : {
      required : "La unidad física es requerida",
      pattern  : "Se debe ingresar solo números mayores a 0"
    },
    tarifaAdvalorem:{
      required : "La tarifa es requerida",
      pattern  : "Se debe ingresar solo números mayores a 0"
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
            <StyledTextField label="Id de partida"
              type="text"
              {...register('partidaId',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.partidaId }
               helperText = {errorValidMsg["partidaId"][errors.partidaId?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre de producto"
              type="text"
              {...register('nombre',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.nombre }
              helperText = {errorValidMsg["nombre"][errors.nombre?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Unidad física"
              type="number"
              {...register('unidadFisica',
                {
                  required: true,
                  pattern : /^[1-9][0-9]*$/
                })}
              error = { !!errors.unidadFisica }
              helperText = {errorValidMsg["unidadFisica"][errors.unidadFisica?.type]}
              InputProps={{endAdornment:<InputAdornment position="end">kg</InputAdornment>}}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Tarifa advalorem'  type='number'
              {...register('tarifaAdvalorem',{
                required: true,
                pattern : /^[1-9][0-9]*$/
              })}
              error       = { !!errors.tarifaAdvalorem }
              helperText  = {errorValidMsg["tarifaAdvalorem"][errors.tarifaAdvalorem?.type]}
              InputProps  = {{endAdornment:<InputAdornment position="end">%</InputAdornment>}}
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
        <h3>Editar un producto</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="Id de partida"
              type="text"
              {...register('partidaId',{
                pattern : /^\d{10}$/g,
                required : true
              })}
              
              
               error = { !!errors.partidaId }
               helperText = {errorValidMsg["partidaId"][errors.partidaId?.type]}
               disabled={true}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre de producto"
              type="text"
              {...register('nombre',
                {
                  required: true,
                  pattern : /^[A-Za-z0-9\s\-()&,']+$/
                })}
              error = { !!errors.nombre }
              helperText = {errorValidMsg["nombre"][errors.nombre?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Unidad física"
              type="text"
              {...register('unidadFisica',
                {
                  required: true,
                  
                })}
              error = { !!errors.unidadFisica }
              helperText = {errorValidMsg["unidadFisica"][errors.unidadFisica?.type]}
              InputProps={{endAdornment:<InputAdornment position="end">kg</InputAdornment>}}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Tarifa advalorem'  type='text'
              {...register('tarifaAdvalorem',{
                required: true,
                
              })}
              error = { !!errors.tarifaAdvalorem }
              helperText = {errorValidMsg["tarifaAdvalorem"][errors.tarifaAdvalorem?.type]}
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

export default ModalProducto;