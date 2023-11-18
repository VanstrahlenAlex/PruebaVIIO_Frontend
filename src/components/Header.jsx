import { Link } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { handleBuscador, cerrarSesionProductos} = useProductos()
    const {cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProductos()
        localStorage.removeItem('token')
    }
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                    Controlador de Productos  {''}<span className="text-sky-800"> VIIO</span> 
                </h2>

                

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleBuscador}
                    >
                        Buscar Proyecto
                    </button>
                    <Link to="/productos" className="font-bold uppercase">Productos</Link>
                    <button type="button" className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>
                    <Busqueda />
                </div>
            </div>
        </header>
    )
}

export default Header
