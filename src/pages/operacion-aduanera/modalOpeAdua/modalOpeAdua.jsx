import React from 'react'
import { styled } from '@mui/material/styles';
import { Modal, TextField, Button} from '@mui/material';


const StyledModal = {
  position: 'absolute',
  width: 400,
  backgroundColor: 'white',
  borderRadius :8,
  padding: 12,
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  transform: 'translate(-50%, -50%)'
}


const StyledTextField = styled(TextField)(({ theme}) => ({
  width: '100%'
}));




const ModalOpeAdua = ({ opened, fnBreaker }) => {

  const modalType = {
    "add"    :   (<div style ={StyledModal}> 
      <h3>Agregar una  Operación aduanera</h3>
      <StyledTextField name="nombre" label="Nombre"/>
      <br /><br />
      <StyledTextField name="empresa" label="Empresa" />
      <br /><br />
      <StyledTextField name="lanzamiento" label="Lanzamiento" />
      <br /><br />
      <StyledTextField name="unidades_vendidas" label="Unidades Vendidas" />
      <br /><br />
      <div align="right">
        <Button color="primary" >Insertar</Button>
        <Button onClick={fnBreaker} >Cancelar</Button>
      </div>
      </div>
    ),
    "update" :   ""

  }

  let choose = "add";
  let reder = modalType[choose];


  return (
    <Modal
    open    = {opened}
    onClose = {fnBreaker}
    >

      { reder }

    </Modal>
  )
}

export default ModalOpeAdua;