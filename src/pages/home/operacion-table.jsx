

import React, {useState, useEffect} from 'react'
import {StyledTable, StyledTableCell, 
  StyledTableContainer, StyledTableHead,
  StyledTableBody, StyledTableRow, StyledPaper } from '../../components/core';

  import api_operacion from '../../services/operacion';


const OperacionTable = () => {
  const [operaciones, setOperaciones] = useState([]);
  useEffect(() =>{

    const fetchAllOperaciones = async() =>{
        const data = await api_operacion.getAllpg();
        setOperaciones(data);
    };

    fetchAllOperaciones();
  }, [])

  const cols = [
    "codigoOperacion",
    "tipo",
    "estado",
    "nitAgenteAduana",
    "codigoTraslado",
    "partidaId",
    "Acciones"
  ]




  return (
   <>
    <StyledTableContainer  component={StyledPaper}>
    <StyledTable sx={{ minWidth: 100, }} aria-label="customized table">
      <StyledTableHead>
        <StyledTableRow >
          {cols.map((col, i) => (
            <StyledTableCell key={i} align="center">{ col }</StyledTableCell>
          ))}
          </StyledTableRow>
          
      </StyledTableHead>
      <StyledTableBody>
        
        {agentesAduana.map((curr, i) => {
      
          return (<StyledTableRow key={i} >
                  <StyledTableCell align="center">
                      { curr.nitaduanero }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.nombre }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.apellido }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.id_pais }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.direccion }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.telefono }
                  </StyledTableCell>
          </StyledTableRow>
        )})}
      </StyledTableBody>
    </StyledTable>
  </StyledTableContainer>
  </>
  )
}

export default OperacionTable