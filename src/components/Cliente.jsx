import { formatearFecha } from "../helpers/FormatearFecha";
import useProductos from "../hooks/useProductos";
import useAdmin from "../hooks/useAdmin";

const Cliente = ({cliente}) => {

    const {handleModalEditarCLiente, handleModalEliminarCliente, completarCliente} = useProductos();
    const {nombre, descripcion, fechaEntrega, prioridad, _id, estado, completado} = cliente || {};

    const admin = useAdmin();

    const obtenerClasePrioridad = () => {
        switch (prioridad) {
            case "Alta":
                return "text-red-500"; 
            case "Media":
                return "text-orange-500"; 
            case "Baja":
                return "text-green-500"; 
            default:
                return ""; 
        }
    };
    
    return (
        <>
            <div className="border-b p-5 flex justify-between items-center">
                <div className="flex flex-col item-start">
                    <p className="mb-2 text-xl">{nombre}</p>
                    <p className="mb-2 text-sm uppercase">{descripcion}</p>
                    <p className="mb-2 text-md">{formatearFecha(fechaEntrega)}</p>
                    <p className={"mb-2 text-sky-600" }>Prioridad: <span className={`${obtenerClasePrioridad()} text-xl`}>{prioridad}</span></p>
                    {estado && <p className=" bg-green-600 uppercase p-1 rounded-lg text-white">Completado por: {cliente.nombre}</p>}
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                    {admin && (
                        <button className="bg-indigo-600 hover:bg-indigo-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditarCLiente(cliente)}
                        >
                            Editar
                        </button>
                    )}
                    
                    <button className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} hover:bg-sky-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                        onClick={() => completarCliente(_id)}
                    >
                        {estado ? "Completa" : "Incompleta"}
                    </button>
            
                    {admin && (
                        <button className="bg-red-600 hover:bg-red-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEliminarCliente(cliente)}
                        >
                            Eliminar
                        </button>
                    )}
                    
                </div>
            </div> 
        </>
    );
}

export default Cliente;


// const Cliente = ({cliente}) => {
//     const {nombre, descripcion, fechaEntrega, prioridad, _id} = cliente;

//     const { Alta, Media, Baja  } = prioridad;
//     console.log(prioridad);
//   return (
//     <>
//         <div className="border-b p-5 flex justify-between items-center">
//             <div>
//                 <p className="text-xl">{nombre}</p>
//                 <p className="text-sm">{descripcion}</p>
//                 <p className="text-xl">{fechaEntrega}</p>
//                 <p className="text-sky-600">Prioridad: <span>{prioridad}</span></p>

//             </div>

//             <div>

//             </div>
//         </div> 
//     </>
//   )
// }

// export default Cliente
