import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import TelaPedido from '../pages/TelaPedido.jsx'
import TelaCliente from '../pages/TelaCliente.jsx'

const Rotas = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/TelaPedido', element: <TelaPedido /> },
  { path: '/TelaCliente', element: <TelaCliente /> },
])

export default Rotas;