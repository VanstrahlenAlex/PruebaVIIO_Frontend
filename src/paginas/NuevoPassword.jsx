import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams();
    const {token} = params


    useEffect(() =>{
        const comprobarToken = async () => {
            try {
                //TODO: mover a cliente Axios
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.message || 'Token no valido',
                    error: true,
                });
            }
        };
        comprobarToken();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if(password.length < 6){
            setAlerta({
                msg : "El password debe ser minimo de 6 Caracteres",
                error : true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta 
    return (
        <>
                <h1 className="text-sky-600 font-black text-6xl capitalize">
                    Reestablece tu Password y no pierdas Accesso a tus {''} <span className="text-slate-700">Productos</span> 
                </h1>
                
                {msg && <Alerta alerta={alerta} />}

                {tokenValido && (
                    <form action="" className="my-10 bg-white shadow rounded-lg p-10"
                        onSubmit={handleSubmit}
                    >
                        <div className="my-5">
                            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                            <input 
                                id="password"
                                type="password"
                                placeholder="Escribe tu Nuevo Password"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input 
                            type="submit"
                            value={"Guardar Nuevo Password"}
                            className="bg-sky-700 hover:bg-sky-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors"
                            />
                    </form>
                )}
                {passwordModificado && (
                    <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/"}
                    > Inicia Sesión</Link>
                )}



                {/* <nav className="lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-slate-500 uppercase text-sm"
                        to={"/"}
                    >¿Ya tienes una cuenta? Inicia Sesión</Link>

                    <Link
                        className="block text-center my-5 text-slate-500 uppercase text-sm"
                        to={"/olvide-password"}
                    >Olvide mi Password</Link>
                </nav> */}
            </>
    )
}

export default NuevoPassword