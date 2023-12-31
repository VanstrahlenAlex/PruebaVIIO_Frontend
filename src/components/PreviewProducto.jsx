/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProducto = ({producto}) => {

    const { auth} = useAuth()

    const {nombre, _id, marca, creador} = producto
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-2">
            <p className="flex-1">
                {nombre}
                <span className="text-sm text-gray-500 uppercase pl-5">{''}{marca}</span>
            </p>
            {auth._id !== creador && (
                    <p className="p-1 text-xs rounded text-white bg-green-500 font-bold uppercase">Colaborador</p>
            )}
        </div>
        

        <Link
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold "
        >
            Ver Producto 
        </Link>
    </div>
  )
}

export default PreviewProducto