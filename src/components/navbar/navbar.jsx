import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #111111;
`;
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const NavBar = () => {
    
    return (
        <Header position="static">
            <Toolbar>
                <Tabs to="./" exact>Gestión de Aduana</Tabs>
                <Tabs to="./empresa" exact>Empresas</Tabs>
                <Tabs to="./producto" exact>Productos</Tabs>
                <Tabs to="./agente-aduana" exact>Agentes</Tabs>
                <Tabs to="./viaje" exact>Viajes</Tabs>
                <Tabs to="./traslado" exact>Traslados</Tabs>
                <Tabs to="./operacion" exact>Operaciones</Tabs>
                
                
                <Tabs to="./reporte" exact>Reportes</Tabs>
            </Toolbar>
            
        </Header>
    )
}

export default NavBar;