import { AppBar, Toolbar, styled } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #579BB1;
    & a.active{
        border-bottom: solid red 2px
    }
`;
    


const NavBar = () => {
    

    const [borderLink, setBorderLink ] = useState('solid red 2px')
    const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
    &:hover{
        border-bottom: solid red 2px

    }
   
`;


    return (
        <Header position="fixed">
            <Toolbar>
                <Tabs to="./" exact="true">Gestión de Aduana</Tabs>
                <Tabs to="./empresa" exact="true">Empresas</Tabs>
                <Tabs to="./producto" exact="true">Productos</Tabs>
                <Tabs to="./agente-aduana" exact="true">Agentes</Tabs>
                <Tabs to="./viaje" exact="true">Viajes</Tabs>
                <Tabs to="./traslado" exact="true">Traslados</Tabs>
                <Tabs to="./operacion" exact="true">Operaciones</Tabs>
                
                
                <Tabs to="./reporte" exact="true">Reportes</Tabs>
            </Toolbar>
            
        </Header>
    )
}

export default NavBar;