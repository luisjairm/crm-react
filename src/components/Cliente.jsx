
const Cliente = ({ cliente }) => {
  const { nombre, empresa, id, email, relefono } = cliente
  return (
    <tr>
      <td className='p-6'>
        {nombre}
      </td>
    </tr>
  )
}

export default Cliente
