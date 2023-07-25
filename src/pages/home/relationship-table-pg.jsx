

import React, {useState, useEffect} from 'react'
import {StyledTable, StyledTableCell, 
  StyledTableContainer, StyledTableHead,
  StyledTableBody, StyledTableRow, StyledPaper } from '../../components/core';

import api_relationship_pg from '../../services/relationship-pg';


const RelationshipTable = () => {
  const [relationship, setRelationship] = useState([]);
  useEffect(() =>{

    const fetchAllRelatioship = async() =>{
        const data = await api_relationship_pg.getAll();
        setRelationship(data);
    };

    fetchAllRelatioship();
  }, [])

  const cols = [
    "Nombre agente de aduana",
    "Apellido agente de aduana",
    "paisdestino",
    "paisorigen",
    "fechaingreso",
    "fechasalida",
    "temperatura",
    "precipitacion",
    "estado",
    "nombre de producto"
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
        
        {relationship.map((curr, i) => {
      
          return (<StyledTableRow key={i} >
                  <StyledTableCell align="center">
                      { curr.nombreaduanero }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.apellido }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.paisdestino }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.paisorigen }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.fechaingreso }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.fechasalida }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.temperatura }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.precipitacion }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.estado }
                  </StyledTableCell>
                 
                  <StyledTableCell align="center">
                      { curr.nombreproducto }
                  </StyledTableCell>
          </StyledTableRow>
        )})}
      </StyledTableBody>
    </StyledTable>
  </StyledTableContainer>
  </>
  )
}

export default RelationshipTable