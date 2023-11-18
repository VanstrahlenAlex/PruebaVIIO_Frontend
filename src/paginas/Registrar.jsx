import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, SetRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async(e) => {
        e.preventDefault();

        //Comprobacion de creacion de usuario - START
        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({
                msg : "Todos los campos son obligatorios",
                error : true
            })
            return
        }
        if(password !== repetirPassword){
            setAlerta({
                msg : "Los Passwords no son iguales",
                error : true
            })
            return
        }
        if(password.length < 6){
            setAlerta({
                msg : "El Password es Demasiado corto, debe ser mayor o igual a 6 caracteres",
                error : true
            })
            return
        }
        setAlerta({})
        //Comprobacion de creacion de usuario - END

        //Crear el usuario en la API
        try {
            //TODO: Mover hacia un cliente Axios
            const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password});
            setAlerta({
                msg: data.msg,
                error : false
            })
            setNombre('')
            setEmail('')
            setPassword('')
            SetRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Crea tu cuenta y Administra tus {''} <span className="text-slate-700">Productos</span> 
            </h1>

            {msg && <Alerta alerta={alerta} />}
            <form action="" 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
                >

                <div className="my-5">
                    <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Tu Nombre de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Escribe tu Password</label>
                    <input 
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repite tu Password</label>
                    <input 
                        id="password2"
                        type="password"
                        placeholder="Repite tu Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        onChange={ e => SetRepetirPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value={"Crear Cuenta"}
                    className="bg-sky-700 hover:bg-sky-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors"
                    />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/"}
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/olvide-password"}
                >Olvide mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar;
