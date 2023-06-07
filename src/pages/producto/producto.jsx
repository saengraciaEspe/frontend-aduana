
import React, { useState } from 'react';
import { Button } from '@mui/material';
import CustomizedTable from "../../components/customized-table/customizedTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalProducto from './modalProducto/modalProducto';
import "./producto.css";


const Producto = () => {

  let cols = ["Dessert (100g serving)",
    "Calories",
    "Fat&nbsp;(g)",
    "Carbs&nbsp;(g)",
    "Protein&nbsp;(g)",
    "Acciones"
  ]
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];

  const [opened, setOpened] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setOpened(true);

  }

  const breaker = () =>{
    setOpened(!opened)
  }

  return (
    <div className='layout'>
    <div className='item'>
    <Button className='btn' 
      onClick={openModal}
      variant="contained" 
      startIcon={<AddCircleIcon/>}> 
      Insertar</Button>
    </div>
    
    <CustomizedTable cols={cols} rows = {rows} />

  <ModalProducto
    opened={opened}
    fnBreaker={breaker}
  />

  </div>
  )
}

export default Producto;