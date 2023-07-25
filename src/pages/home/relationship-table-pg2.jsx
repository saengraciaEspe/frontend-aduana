

import React, {useState, useEffect} from 'react'
import {StyledTable, StyledTableCell, 
  StyledTableContainer, StyledTableHead,
  StyledTableBody, StyledTableRow, StyledPaper } from '../../components/core';

import api_relationship_pg from '../../services/relationship-pg';


const RelationshipTable2 = () => {
  const [relationship, setRelationship] = useState([]);
  useEffect(() =>{

    const fetchAllRelatioship = async() =>{
        const data = await api_relationship_pg.getAll();
        setRelationship(data);
    };

    fetchAllRelatioship();
  }, [])

  const cols = [
    "nivel_importador",
    "puertoentrada",
    "unidadfisica",
    "tarifaadvalorem",
    "total",
    "total_tarifaadva"
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
                      { curr.nivel_importador }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.puertoentrada }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.unidadfisica }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.tarifaadvalorem }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.total }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      { curr.total_tarifaadva }
                  </StyledTableCell>
          </StyledTableRow>
        )})}
      </StyledTableBody>
    </StyledTable>
  </StyledTableContainer>
  </>
  )
}

export default RelationshipTable2