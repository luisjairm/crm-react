import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from './Formulario'
import Error from '../components/Error'
import { agreagrCliente } from '../data/clientes'

export const action = async ({ request }) => {
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
    await agreagrCliente(data)
    return redirect('/')
  }
  return errores
}

const NuevoCliente = () => {
  const navigate = useNavigate()
  const errores = useActionData()
  console.log(errores)
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>
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
          <Formulario />
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

export default NuevoCliente
