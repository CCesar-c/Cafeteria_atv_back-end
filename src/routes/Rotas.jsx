import { createBrowserRouter } from 'react-router-dom'

import TelaPedido from '../pages/TelaPedido.jsx'
import TelaCliente from '../pages/TelaCliente.jsx'

const Rotas = createBrowserRouter([
  { path: '/TelaPedido', element: <TelaPedido /> },
  { path: '/TelaCliente', element: <TelaCliente /> },
])

export default Rotas;