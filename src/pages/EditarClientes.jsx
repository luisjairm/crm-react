import { useLoaderData } from 'react-router-dom'
import { obtenerCliente } from '../data/clientes'

export const loader = async ({ params }) => {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'El cliente no existe'
    })
  }
  return null
}
const EditarClientes = () => {
  const cliente = useLoaderData()
  console.log(cliente)
  return (
    <div>EditarClientes</div>
  )
}

export default EditarClientes
