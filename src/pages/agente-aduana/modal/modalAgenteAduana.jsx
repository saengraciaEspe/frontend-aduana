import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from 'axios';



import {
  Modal,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

import { useForm } from "react-hook-form";

import "./modalAgenteAduana.css";
<<<<<<< Updated upstream
import api_agente_aduana from '../../../services/agente-aduanero';
import api_countries from '../../../services/countries/countries';


=======
import api_agente_aduana from "../../../services/agente-aduanero";
>>>>>>> Stashed changes

const StyledModal = {
  position: "absolute",
  width: "50%",
  backgroundColor: "white",
  borderRadius: 8,
  padding: 20,
  top: "50%",
  left: "50%",
  bgcolor: "background.paper",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  transform: "translate(-50%, -50%)",
};

const StyledTextField = styled(TextField)(({}) => ({
  width: "100%",
}));

const ModalAgenteAduana = ({
  opened,
  fnBreaker,
  type,
  data,
  render,
  updateTable,
}) => {

<<<<<<< Updated upstream

  const [countries, setCountries] = useState([]);

  useEffect(() =>{

    const fetchAllCountriesSouthAmerica = async() =>{
        const data = await api_countries.getSouthAmerica();
    

        setCountries(data);
    };

    fetchAllCountriesSouthAmerica();
  }, [])


  
  console.log(data?.nitAgenteAduana);
  
  const { register, handleSubmit,
    formState :{ errors } } = useForm({
      mode : "onBlur",
      defaultValues : {
        nitAgenteAduana:  data?.nitAgenteAduana,
        nombre         :  data?.nombre,
        apellido       :  data?.apellido,
        Pais           :  data?.Pais,
        direccion      :  data?.direccion,
        telefono       :  data?.telefono
      },
      

    });

  const onAdd = async(data) => {
=======
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      nitAgenteAduana: data?.nitAgenteAduana,
      nombre: data?.nombre,
      apellido: data?.apellido,
      Pais: data?.Pais,
      direccion: data?.direccion,
      telefono: data?.telefono,
    },
  });

  const onAdd = async (data) => {
>>>>>>> Stashed changes
    console.log(data);
    await api_agente_aduana.post(data);
    updateTable((prev) => !prev);
    fnBreaker(!opened);
    render(false);
  };

  const onUpdate = async (data) => {
    await api_agente_aduana.put(data);
    updateTable((prev) => !prev);
    fnBreaker(!opened);
    render(false);
  };


  const getCountriesSouthAmerica = async() => {
   return await api_countries.getSouthAmerica();
  }


  const errorValidMsg = {
    nitAgenteAduana: {
      required: "El nit es requerido",
      pattern:
        "Se debe ingresar un número de cédula, el cuál debe tener 10 dígitos",
    },
    nombre: {
      required: "El nombre es requerido",
      pattern: "La primera letra del nombre debe empezar con mayúscula",
    },
    apellido: {
      required: "El apellido es requerido",
      pattern: "El apellido no tiene un formato correcto",
    },
    Pais: {
      required: "El país es requerido",
      pattern: "El país no tiene un formato correcto",
    },
    direccion: {
      required: "La dirección es requerida",
      pattern: "La dirección no tiene un formato correcto",
    },
    telefono: {
      required: "El teléfono es requerido",
      pattern: "El número de teléfono debe empezar con 09 seguido de 8 dígitos",
    },
  };

  const modalType = {
    
    add: (

      <div style={StyledModal}>
        <form onSubmit={handleSubmit(onAdd)} noValidate>
          <h3>Agregar un agente de aduana</h3>

          <Grid
            container
            rowSpacing={{ xs: 2, md: 2 }}
            columnSpacing={{ xs: 1, md: 2 }}
          >
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="NIT"
                type="text"
                {...register("nitAgenteAduana", {
                  pattern: /^\d{10}$/g,
                  required: true,
                })}
                error={!!errors.nitAgenteAduana}
                helperText={
                  errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Nombre"
                type="text"
                {...register("nombre", {
                  required: true,
                  pattern:
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.nombre}
                helperText={errorValidMsg["nombre"][errors.nombre?.type]}
              />
            </Grid>

<<<<<<< Updated upstream
          <Grid item xs={12} md={6}>
            <StyledTextField select
            label='País'  type='text'
            defaultValue=""
            {...register('Pais',
            {
              required: true
            })}
            error = { !!errors.Pais }
            helperText = {errorValidMsg["Pais"][errors.Pais?.type]}

            >
              {countries.map((curr) => (
              <MenuItem key={curr.value} value={curr.value}>
                {curr.value}
              </MenuItem>
            ))}
=======
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Apellido"
                type="text"
                {...register("apellido", {
                  required: true,
                  pattern:/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.apellido}
                helperText={errorValidMsg["apellido"][errors.apellido?.type]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                id="select"
                label="País"
                type="text"
                {...register("Pais", {
                  required: true,
                  pattern:
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.Pais}
                helperText={errorValidMsg["Pais"][errors.Pais?.type]}
              ></StyledTextField>
            </Grid>
>>>>>>> Stashed changes


          <Grid item xs={12} md={6}>
            <StyledTextField
              label="Dirección"
              type="text"
              {...register('direccion', {
                required: true,
                pattern : /^[A-Za-z0-9\s\-()&,']+$/
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
                required: true,
                pattern : /^(09)\d{8}$/
              })}
              error = { !!errors.telefono }
              helperText = {errorValidMsg["telefono"][errors.telefono?.type]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div align="right">
              <Button onClick={() =>{fnBreaker(!opened); render(false); updateTable((prev) =>!prev)  }}  
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
    update: (
      <div style={StyledModal}>
        <form onSubmit={handleSubmit(onUpdate)} noValidate>
          <h3>Editar un agente de aduana</h3>

          <Grid
            container
            rowSpacing={{ xs: 2, md: 2 }}
            columnSpacing={{ xs: 1, md: 2 }}
          >
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="NIT"
                type="text"
                {...register("nitAgenteAduana", {
                  pattern: /^\d{10}$/g,
                  required: true,
                })}
                error={!!errors.nitAgenteAduana}
                helperText={
                  errorValidMsg["nitAgenteAduana"][errors.nitAgenteAduana?.type]
                }
                disabled={true}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Nombre"
                type="text"
                {...register("nombre", {
                  required: true,
                  pattern:
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.nombre}
                helperText={errorValidMsg["nombre"][errors.nombre?.type]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Apellido"
                type="text"
                {...register("apellido", {
                  required: true,
                  pattern:
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.apellido}
                helperText={errorValidMsg["apellido"][errors.apellido?.type]}
              />
            </Grid>

          <Grid item xs={12} md={6}>
            <StyledTextField id='select' label='País'  type='text'
              {...register('Pais',{
                required: true,
                pattern : /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
              })}
              error = { !!errors.Pais }
              helperText = {errorValidMsg["Pais"][errors.Pais?.type]}
            >
           

            </StyledTextField>
          </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Dirección"
                type="text"
                {...register("direccion", {
                  required: true,
                  pattern:
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+([ ]?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
                })}
                error={!!errors.direccion}
                helperText={errorValidMsg["direccion"][errors.direccion?.type]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Teléfono"
                type="text"
                {...register("telefono", {
                  required: true,
                  pattern: /^(09)\d{8}$/,
                })}
                error={!!errors.telefono}
                helperText={errorValidMsg["telefono"][errors.telefono?.type]}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <div align="right">
                <Button type="submit" color="primary">
                  Insertar
                </Button>
                <Button
                  onClick={() => {
                    fnBreaker(!opened);
                    render(false);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    ),
  };

  return (
    <Modal open={opened} onClose={fnBreaker}>
      {modalType[type]}
    </Modal>
  );
};

export default ModalAgenteAduana;
