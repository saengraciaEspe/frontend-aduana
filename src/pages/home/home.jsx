import React from 'react'
import "./home.css"

import api_agente_aduana from '../../services/agente-aduanero';
import api_operacion from '../../services/operacion';
import api_paises_pg from '../../services/pais-pg';
import api_climas_pg from '../../services/clima-pg';
import api_producto from '../../services/producto';

import api_relationship_pg from '../../services/relationship-pg';
import Animated from '../../components/animated/animated';

import AgenteAduanaTable from './agente-aduana-table';
import RelationshipTable from './relationship-table-pg';
import RelationshipTable2 from './relationship-table-pg2';

 const Home = () => {

  







  return (
    <Animated>
    <div className='layout'>
      <div className='item'>
     <RelationshipTable></RelationshipTable>
    
      </div>
      <div className='item'>
    
     <RelationshipTable2></RelationshipTable2>
      </div>

    </div>
    </Animated>
  )
}

export default Home;


