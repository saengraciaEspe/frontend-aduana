import React from 'react';
import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/home/home';
import OperacionAduanera  from './pages/operacion-aduanera/operacion-aduanera';
import Producto from './pages/producto/producto';


import './App.css'
import AgenteAduana from './pages/agente-aduana/agente-aduana';

const Layout = ({ children }) =>{
    return <Outlet/>
}


function App() {
  const router = createBrowserRouter([
    {
      path    : "/",
      element : <Layout/> ,
      children : [
        {
          path     : "/operacion-aduanera",
          element  : <OperacionAduanera/>
        },
        {
          path     : "/producto",
          element  : <Producto/>
        },
        {
          path     :  "/agente-aduana",
          element  :  <AgenteAduana/>
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
