import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

import "./modalAgenteAduana.css";
import api_agente_aduana from '../../../services/agente-aduanero';



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


/* const StyledInput = styled('input')({
  width: '100%',
  height: '50px',
  boxSizing: 'border-box',
  fontSize: '20px',
  border: 'solid gray 1px',
  borderRadius: '2px',
  '&:focus': {
    outline: 'solid blue 1px',
  }
}) */

/* const StyledSelect = styled('select')({
  width: '100%',
  height: '50px',
  boxSizing: 'border-box',
  fontSize: '20px',
  border: 'solid gray 1px',
  borderRadius: '2px',
  '&:focus': {
    outline: 'solid blue 1px',
  }

}) */

const SlotInput = styled('div')({
  'width': '100%',
  'height': '100%'
})



const StyledTextField = styled(TextField)(({  }) => ({
  width: '100%'

}));

const ModalAgenteAduana = ({ opened, fnBreaker, type, data }) => {
console.log(data)

  const { register, handleSubmit,
    formState :{ errors } } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    await api_agente_aduana.post(data);
    window.location.reload()
  }

  const errorValidMsg = {
    nitAgenteAduana : {
      required : "El nit es requerido",
      pattern  : "El nit no tiene un formato correcto"
    },
    nombre : {
      required : "El nombre es requerido",
      pattern  : "El nombre no tiene un formato correcto"
    },
    apellido : {
      required : "El apellido es requerido",
      pattern  : "El apellido no tiene un formato correcto"
    },
    Pais:{
      required : "La dirección es requerida",
      pattern  : "La dirección no tiene un formato correcto"
    },
    direccion : {
      required : "La dirección es requerida",
      pattern  : "La dirección no tiene un formato correcto"
    },
    telefono :{
      required : "El teléfono es requerido",
      pattern  : "La teléfono no tiene un formato correcto"
    }
    
  }

  /* const agenteToUpdate = async() => {
   
    return await api_agente_aduana.getForId(data._id);
  } */
  
  

  const [dataForm, setDataForm ]= useState(
    {
    "nitAgenteAduana" : '',
    "nombre": '',
    "apellido" : '',
    "Pais" : '',
    "direccion" :'',
    "telefono" :''
    }
  ); 

  

  const onChange = (e) => {
    e.preventDefault();
    setDataForm((prev) => ({...prev, [e.target.name]:e.target.value}))
    console.log(dataForm);


  }

  



  const onSubmitUpdate = async(e) => {
    e.preventDefault();
    console.log(dataForm);
    await api_agente_aduana.put(...dataForm);

   /*  window.location.reload() */
  }
 
  const modalType = {
    "add": (<div style={StyledModal} >
      <form onSubmit={ handleSubmit(onSubmit) }>
        <h3>Agregar un agente de aduana</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="NIT"
              type="text"
              {...register('nitAgenteAduana')}
              error = { !!errors.nitAgenteAduana }
              helperText = {errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre"
              type="text"
              {...register('nombre',
                {
                  required: 'El nombre es requerido',
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.nombre }
              helperText = {errorValidMsg["nombre"][errors.nombre?.type]}
            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Apellido"
              type="text"
              {...register('apellido',
                {
                  required: 'El apellido es requerido',
                  pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                })}
              error = { !!errors.apellido }
              helperText = {errorValidMsg["apellido"][errors.apellido?.type]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='País'  type='text'
              {...register('Pais',{
                required: 'La dirección es requerida',
              })}
              error = { !!errors.Pais }
              helperText = {errorValidMsg["Pais"][errors.Pais?.type]}
            >
            {/*  {countries.map((curr, i) =>(
              <MenuItem key={i} value={curr}>
                  {curr}
             </MenuItem>
             )) } */}

            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Dirección"
              type="text"
              {...register('direccion', {
                required: 'La dirección es requerida',
                pattern : /^[A-Za-z0-9\s\.,#áéíóúñÁÉÍÓÚÑ-]+$/
              })}
              error = { !!errors.direccion }
              helperText = {errorValidMsg["direccion"][errors.direccion?.type]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Teléfono"
              type="text"
              {...register('telefono', {
                required: 'El número de teléfono es requerido',
                pattern : /^(09)\d{8}$/
              })}
              error = { !!errors.telefono }
              helperText = {errorValidMsg["telefono"][errors.telefono?.type]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button type='submit' color="primary" >Insertar</Button>
              <Button onClick={fnBreaker} >Cancelar</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
    ),
    "update": (<div style={StyledModal} >
      <form onSubmit={onSubmitUpdate }>
        <h3>Editar un agente de aduana</h3>

        <Grid container rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1, md: 2 }}
        >
          <Grid item xs={12} md={6}>
            <StyledTextField label="NIT"
              type="text"
              name = "nitAgenteAduana"
              onKeyUp={onChange}
              value = {dataForm.nitAgenteAduana}
              disabled = {true}
            />
          
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField label="Nombre"
              type="text"
              name = "nombre"
              onKeyUp={onChange}
              value = {dataForm.nombre}

            />
          
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Apellido"
              type="text"
              name = "apellido"
              onKeyUp={onChange}
              value = {dataForm.apellido}
            
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='pais' label='País'  type='text'
         
             name = "Pais"
             onKeyUp={onChange}
             value = {dataForm.Pais}
            >
            {/*  {countries.map((curr, i) =>(
              <MenuItem key={i} value={curr}>
                  {curr}
             </MenuItem>
             )) } */}

            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Dirección"
              type="text"
              name = "direccion"
              onKeyUp={onChange}
              value = {dataForm.direccion}
              
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Teléfono"
              type="text"
              name = "telefono"
              onKeyUp={onChange}
              value = {dataForm.telefono}
              
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button type='submit' color="primary" >Insertar</Button>
              <Button onClick={fnBreaker} >Cancelar</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
    )

  }


  let reder = modalType[type];


  return (
    <Modal
      open={opened}
      onClose={fnBreaker}
    >

      {reder}

    </Modal>
  )
}

export default ModalAgenteAduana;