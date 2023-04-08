import { useLoaderData } from 'react-router-dom'

export const loader = async ({ params }) => {
  return params
}
const EditarClientes = () => {
  const params = useLoaderData()
  console.log(params)
  return (
    <div>EditarClientes</div>
  )
}

export default EditarClientes
