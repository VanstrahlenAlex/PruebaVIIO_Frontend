import useProductos from "./useProductos";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { producto } = useProductos();
    const { auth } = useAuth();

    return producto.creador === auth._id
}

export default useAdmin