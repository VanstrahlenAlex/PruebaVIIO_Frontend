/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 


const ProductosContext = createContext();

const ProductosProvider = ({children}) => {

    const [productos, setProductos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [producto, setProducto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [ modalFormularioCliente, setModalFormularioCliente] = useState(false);
    const [cliente, setCliente] = useState({})
    const [modalEliminarCliente, setModalEliminarCliente] = useState(false);
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)


    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios('/productos', config);
            setProductos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProductos();
    }, [auth])

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    const submitProducto = async (producto) => {
        console.log(producto);
        
        if(producto.id) {
            await editarProducto(producto);
        } else {
            await nuevoProducto(producto);
        }
        
    }

    const editarProducto = async (producto) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/productos/${producto.id}`, producto, config);
            //Sincronizar el State
            const productosActualizados = productos.map(productoState => productoState._id === data._id ? data : productoState)
            setProductos(productosActualizados);
            //
            setAlerta({
                msg: "Producto Actualizado Correctamente",
                error : false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const nuevoProducto = async (producto) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/productos', producto, config);
            console.log(data);
            setProductos([...productos, data])
            setAlerta({
                msg: "Producto Creado Correctamente",
                error : false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 2000);
        } catch (error) {
            console.log("Error en el catch de la funcion submitProducto en el archivo de ProductosProvider.jsx");
            console.log(error); 
        }
    }

    const obtenerProducto = async(id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/productos/${id}`, config);
            setProducto(data)
            setAlerta({})
        } catch (error) {
            navigate('/productos')
            setAlerta({
                msg  : error.response.data.msg,
                error : true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProducto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/productos/${id}`, config);
            //Sincronizar el State
            const productosActualizados = productos.filter(productoState => productoState._id !== id)
            setProductos(productosActualizados);
            setAlerta({
                msg : data.msg,
                error : false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalCliente = () => {
        setModalFormularioCliente(!modalFormularioCliente)
        setCliente({})
    }

    const submitCliente = async (cliente) => {

        if(cliente?.id) {
            await editarCliente(cliente)
        } else {
            await agregarCliente(cliente)
        }
        
    }
    const editarCliente = async (cliente) =>{
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/clientes/${cliente.id}`, cliente, config);
            
            const productoActualizado = {...producto}
            productoActualizado.clientes = productoActualizado.clientes.map(clienteState => clienteState._id === data._id ? data : clienteState)
            setProducto(productoActualizado)
            setAlerta({})
            setModalFormularioCliente(false)
        } catch (error) {
            console.log(error);
        }
    }
    const agregarCliente = async (cliente) =>{
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/clientes', cliente, config)
            console.log(data);
            //Agregar la tarea al State
            const productoActualizado = {...producto}
            productoActualizado.clientes = [...producto.clientes, data];

            setProducto(productoActualizado)
            setAlerta({})
            setModalFormularioCliente(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEditarCLiente = async(cliente) => {
        setCliente(cliente);
        setModalFormularioCliente(true)
    }

    const  handleModalEliminarCliente = async(cliente) => {
        setCliente(cliente);
        setModalEliminarCliente(!modalEliminarCliente)
    }

    const eliminarCliente = async() => {

        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/clientes/${cliente._id}`, config);
            setAlerta({
                msg : data.msg,
                error : false,
            })
            const productoActualizado = {...producto}
            productoActualizado.clientes = productoActualizado.clientes.filter(clienteState => clienteState._id !== cliente._id)
            setProducto(productoActualizado)
            setModalEliminarCliente(false)
            setCliente({})
            setTimeout(() =>{
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const submitColaborador = async (email) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/productos/colaboradores', {email}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error : true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async(email) => {
        
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/productos/colaboradores/${producto._id}`, email, config);
            setAlerta({
                msg : data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error : true
            })
        }
    }


    const handleModalEliminarColaborador = (colaborador) =>{
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador);
    }

    const eliminarColaborador = async() => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/productos/eliminar-colaborador/${producto._id}`, {id : colaborador._id}, config);

            const productoActualizado = {...producto}
            productoActualizado.colaboradores = productoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProducto(productoActualizado)
            setAlerta({
                msg : data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)
            setTimeout(() =>{
                setAlerta({})
            }, 2000)
        } catch (error) {
            console.log(error.response);
        }
    }

    const completarCliente = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/clientes/estado/${id}`,{}, config)
            const productoActualizado = {...producto}
            productoActualizado.clientes = productoActualizado.clientes.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProducto(productoActualizado);
            setCliente({})
            setAlerta({})
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    const cerrarSesionProductos = () => {
        setProductos([])
        setProducto([])
        setAlerta({})
    }
    //
    return(
        <ProductosContext.Provider
            value={{
                productos,
                mostrarAlerta,
                alerta,
                submitProducto,
                obtenerProducto,
                producto,
                cargando,
                eliminarProducto,
                modalFormularioCliente,
                handleModalCliente,
                submitCliente,
                handleModalEditarCLiente,
                cliente,
                modalEliminarCliente,
                handleModalEliminarCliente,
                eliminarCliente,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarCliente,
                handleBuscador,
                buscador,
                cerrarSesionProductos
            }}
        >
            {children}
        </ProductosContext.Provider>
    )
}

export {
    ProductosProvider
}

export default ProductosContext;