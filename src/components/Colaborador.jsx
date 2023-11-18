/* eslint-disable react/prop-types */
import useProductos from "../hooks/useProductos";

const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProductos();

    const { nombre, email} = colaborador;
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p>{nombre}</p>
            <p className="text-sm text-gray-500">{email}</p>
            
        </div>
        <div>
            <button
                type="button"
                className="bg-red-600 hover:bg-red-800 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white"
                onClick={() => handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        </div>
    </div>
  )
}



export default Colaborador