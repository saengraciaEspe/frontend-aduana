import React from 'react';
import './App.css'
import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/home/home';
import { Operacion }  from './pages/operacion/operacion';
import {Producto} from './pages/producto/producto';
import {AgenteAduana} from './pages/agente-aduana/agente-aduana';
import { Empresa } from './pages/empresas/empresa';
import {Viaje} from './pages/viaje/viaje';
import { Traslado } from './pages/traslado/traslado';
import { Reporte } from './pages/reporte/reporte';
import NavBar from './components/navbar/navbar';
import Animated from './components/animated/animated';

const Layout = ({ children }) =>{

    const output = (
    <div className='layout-app' >
      <NavBar/>
      <Outlet/>
    </div>)
    return output;
}


function App() {
  const router = createBrowserRouter([
    {
      path    : "/",
      element : <Layout/> ,
      children : [
        {
          path    : "/",
          element : <Home/>
        }
        ,
        {
          path     : "/operacion",
          element  : <Operacion/>
        },
        {
          path     : "/producto",
          element  : <Producto/>
        },
        {
          path     :  "/agente-aduana",
          element  :  <AgenteAduana/>
        },
        {
          path     :  "/empresa",
          element  :  <Empresa/> 
        },
        {
          path     :  "/viaje",
          element  :  <Viaje/> 
        },
        {
          path     : "/traslado",
          element  : <Traslado/>
        },
        {
          path     :  "/reporte",
          element  : <Reporte/>
        }
      ]
    }
    
    ]);

  return (
    <>
     <RouterProvider 
        router={router}>
          
      </RouterProvider>
    </>
  )
}

export default App
