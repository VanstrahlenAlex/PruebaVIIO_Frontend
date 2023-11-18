import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import Alerta from "./Alerta";

const FormularioProductos = () => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [marca, setMarca] = useState('');

    const params = useParams();
    const { mostrarAlerta, alerta, submitProducto, producto } = useProductos();

    useEffect(() =>{
        if(params.id){
            setId(producto._id)
            setNombre(producto.nombre)
            setDescripcion(producto.descripcion)
            setFechaEntrega(producto.fechaEntrega?.split('T')[0])
            setMarca(producto.marca)

        } 
    }, [params])

    


    const handleSubmit = async(e) =>{
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, marca].includes('')){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error : true
            })
            return
        }

        //Pasar los datos hacia el provider
        await submitProducto({id, nombre, descripcion, fechaEntrega, marca});

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setMarca('')
    }

    const { msg } = alerta;

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
            <label htmlFor="nombre"
                className="text-gray-700 uppercase font-bold text-sm"
            >Nombre del Producto</label>
            <input
                id="nombre"
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Producto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="descripcion"
                className="text-gray-700 uppercase font-bold text-sm"
            >Descripcion del Producto</label>
            <textarea
                id="descripcion"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Descripcion del Producto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="fecha-entrega"
                className="text-gray-700 uppercase font-bold text-sm"
            >Fecha de entrega del Producto</label>
            <input
                id="fecha-entrega"
                type="date"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="marca"
                className="text-gray-700 uppercase font-bold text-sm"
            >Nombre de la Marca</label>
            <input
                id="marca"
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre de la Marca"
                value={marca}
                onChange={e => setMarca(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            value={id ? "Actualizar Producto" : "Crear Producto"}
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded hover:bg-sky-800 cursor-pointer transition-colors"
            />
    </form>
  )
}

export default FormularioProductos
