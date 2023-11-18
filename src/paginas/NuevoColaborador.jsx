import FormularioColaborador from "../components/FormularioColaborador";
import { useEffect } from "react";
import useProductos from "../hooks/useProductos";
import { useParams } from "react-router-dom"; 
import Alerta from "../components/Alerta";
const NuevoColaborador = () => {

    const { obtenerProducto, producto, cargando, colaborador, agregarColaborador, alerta } = useProductos();
    const params = useParams()

    useEffect(() =>{
        obtenerProducto(params.id)
    }, []);

    
    if(!producto?._id) return <Alerta alerta={alerta} />
    return (
        <>
            <h1 className="text-4xl font-black">Añadir Colaborador(a) al Producto : {producto.nombre}</h1>
            <div className='mt-10 flex justify-center'>
                <FormularioColaborador />
            </div>

            {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>

                        <button
                            type="button"
                            className="bg-slate-500 hover:bg-slate-700 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            onClick={() =>agregarColaborador({email: colaborador.email})}
                        >
                            Agregar al Producto
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default NuevoColaborador