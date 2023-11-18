import { useParams, Link } from "react-router-dom"
import useProductos from "../hooks/useProductos";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import ModalFormularioCliente from "../components/ModalFormularioCliente";
import ModalEliminarCliente from "../components/ModalEliminarCliente";
import Cliente from "../components/Cliente";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";

const Producto = () => {

    const params = useParams();
    const {obtenerProducto, producto, cargando, handleModalCliente, alerta } = useProductos();
    const admin = useAdmin()

    useEffect(() =>{
        obtenerProducto(params.id)
    }, [])
    
    const {nombre } = producto;

    if(cargando) return "Cargando..."

    const { msg} = alerta


    return (
        
            <>
                    <div className="flex justify-between ">
                        <h1 className="font-black text-4xl">{nombre}</h1>
                        {admin && (
                            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                                <Link
                                    to={`/productos/editar/${params.id}`}
                                    className="uppercase font-bold"
                                >Editar</Link>

                            </div>
                        )}
                    </div>

                    {admin && (
                        <button
                            onClick={handleModalCliente}
                            type="button"
                            className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-600 text-white y text-center mt-5 flex gap-2 items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                            Nuevo Cliente
                        </button>
                    )}
                    

                    <p className="font-bold text-xl mt-10">Clientes del Producto</p>
                    
                    <div className="bg-white rounded-lg shadow mt-10">
                        {producto.clientes?.length ? producto.clientes?.map( (cliente => (
                            <Cliente 
                                key={cliente._id}
                                cliente={cliente}
                            />
                        )) ) : <p className="text-center p-10 my-5">No hay clientes en este Producto</p>}
                    </div>
                    
                    {admin && (
                        <>
                            <div className="flex items-center justify-between mt-10">
                                <p className="font-bold text-xl mt-10">Colaboradores</p>
                                <Link
                                    to={`/productos/agregar-colaborador/${producto._id}`}
                                    className="text-gray-400 hover:text-black uppercase font-bold flex gap-2 items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                    </svg>

                                    Agregar
                                </Link>
                            </div>

                        <div className="bg-white rounded-lg shadow mt-10">
                            {producto.colaboradores?.length ? producto.colaboradores?.map( (colaborador => (
                                    <Colaborador 
                                        key={colaborador._id}
                                        colaborador={colaborador}
                                    />
                            )) ) : <p className="text-center p-10 my-5">No hay Colaborador en este Producto</p>}
                        </div>
                    </>
                    )}
                    

                    <ModalFormularioCliente/>
                    <ModalEliminarCliente/>
                    <ModalEliminarColaborador />    
                
            </>
        
        
    )
}

export default Producto
