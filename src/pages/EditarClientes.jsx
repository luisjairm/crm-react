import { useLoaderData, Form, useNavigate, redirect, useActionData } from 'react-router-dom'
import { obtenerCliente, actualizarClientes } from '../data/clientes'
import Formulario from './Formulario'
import Error from '../components/Error'

export const loader = async ({ params }) => {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'El cliente no existe'
    })
  }
  return cliente
}

export const action = async ({ request, params }) => {
  const formDat = await request.formData()
  const data = Object.fromEntries(formDat)

  const email = formDat.get('email')
  // eslint-disable-next-line prefer-regex-literals, no-useless-escape
  const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")

  // Validación
  const errores = []
  if (!regex.test(email)) {
    errores.push('El email no es valido')
  }
  if (Object.values(data).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }
  if (!Object.keys(errores).length) {
    await actualizarClientes(params.clienteId, data)

    return redirect('/')
  }
  return errores
}
const EditarClientes = () => {
  const cliente = useLoaderData()
  const navigate = useNavigate()
  const errores = useActionData()
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>A continuación podras modificar los datos de un cliente</p>
      <div className='flex justify-end'>
        <button
          type='button'
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>
      <div className='bg-white rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {
        errores?.length && errores.map((error, i) => (
          <Error
            key={i}
          >
            <p>{error}</p>
          </Error>
        ))
      }
        <Form
          method='post'
          noValidate
        >
          <Formulario
            cliente={cliente}
          />
          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value='Agregar Cliente'
          />
        </Form>
      </div>
    </>
  )
}

export default EditarClientes
