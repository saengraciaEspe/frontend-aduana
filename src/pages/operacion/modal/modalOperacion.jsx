import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';

import { useForm } from 'react-hook-form';

/* import "./ModalEmpresa.css"; */
import api_operacion from '../../../services/operacion';
import api_agente_aduana from '../../../services/agente-aduanero';
import api_traslado from '../../../services/traslado';
import api_producto from '../../../services/producto';



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

   const [agentesAduana, setAgentesAduana ] = useState([]);
  useEffect(() =>{

    const getAgentesAduana = async() =>{
        const data = await api_agente_aduana.getAll();
        let dataParsed = data.map(curr =>({
          idAgente : curr._id
        }))
        setAgentesAduana(dataParsed);
    };

    getAgentesAduana();
  }, [])

  const [traslados, setTraslados ] = useState([]);
  useEffect(() =>{

    const getTraslados = async() =>{
        const data = await api_traslado.getAll();
        let dataParsed = data.map(curr =>({
          idTraslado : curr._id
        }))
        setTraslados(dataParsed);
    };

    getTraslados();
  }, [])

  const [productos, setProductos ] = useState([]);
  useEffect(() =>{

    const getProductos = async() =>{
        const data = await api_producto.getAll();
        let dataParsed = data.map(curr =>({
          idPartida : curr._id
        }))
        setProductos(dataParsed);
    };

    getProductos();
  }, [])

  const estadosOptions = [
    {
      label : "Activo",
      value : true
    },
    {
      label : "Inactivo",
      value : false
    }
  ]


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
      required : "El código de operación es requerido",
      pattern  : "Se debe ingresar un código de operación, el cuál debe tener 10 dígitos"
    },
    tipo : {
      required : "El tipo de operación es requerido",
      pattern  : "No se permiten números"
    },
    estado : {
      required : "El estado es requerida",
      pattern  : "El estado"
    },
    nitAgenteAduana:{
      required : "El NIT de agente es requerido",
    },
    codigoTraslado:{
      required : "La código de traslado es requerida",
    },
    partidaId:{
      required : "El id de partida es requerida",
      
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
                  pattern : /^[A-Za-z0-9 ]*$/
                })}
              error = { !!errors.tipo }
              helperText = {errorValidMsg["tipo"][errors.tipo?.type]}
            />
          
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledTextField label="Estado" select
              defaultValue=""
              type="text"
              {...register('estado',
                {
                  required: true,
                  
                })}
              error = { !!errors.estado }
              helperText = {errorValidMsg["estado"][errors.estado?.type]}
            >
              {estadosOptions.map((curr) => (
                <MenuItem key={curr.label} value={curr.value}>
                  {curr.label}
                </MenuItem>
              ))}
          </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
          <StyledTextField select
            label='Nit de agente de aduana'  type='text'
            defaultValue=""
            /* SelectProps={{
              native: true,
            }} */

            {...register('nitAgenteAduana',
            {
              required: true
            })}
            error = { !!errors.nitAgenteAduana }
            helperText = {errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]}
            >
              {agentesAduana.map((curr) => (
              <MenuItem key={curr.idAgente} value={curr.idAgente}>
                {curr.idAgente}
              </MenuItem>
            ))}

            </StyledTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Código de traslado'  type='text' select
              defaultValue=""
            /* SelectProps={{
              native: true,
            }} */

            {...register('codigoTraslado',
            {
              required: true
            })}
            error = { !!errors.codigoTraslado }
            helperText = {errorValidMsg["codigoTraslado"][errors.codigoTraslado?.type]}
            >
              {traslados.map((curr) => (
              <MenuItem key={curr.idTraslado} value={curr.idTraslado}>
                {curr.idTraslado}
              </MenuItem>
            ))}
      

            </StyledTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Partida de Id'  type='text' select
              {...register('partidaId',{
                required: true,
                
              })}
              error = { !!errors.partidaId }
              helperText = {errorValidMsg["partidaId"][errors.partidaId?.type]}
              defaultValue=""
            >
              {productos.map((curr) => (
              <MenuItem key={curr.idPartida} value={curr.idPartida}>
                {curr.idPartida}
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
        <h3>Editar una operación</h3>

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
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='Código de traslado'  type='text'
              {...register('codigoTraslado',{
                required: true,
                
              })}
              error = { !!errors.codigoTraslado }
              helperText = {errorValidMsg["codigoTraslado"][errors.codigoTraslado?.type]}
              disabled={true}
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

export default ModalOperacion;