import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida.jsx";

import Login from "./paginas/Login.jsx";
import Registrar from "./paginas/Registrar.jsx";
import OlvidePassword from "./paginas/OlvidePassword.jsx";
import NuevoPassword from "./paginas/NuevoPassword.jsx";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { ProductosProvider } from "./context/ProductosProvider.jsx";

//Rutas protegidas
import Productos from "./paginas/Productos.jsx";
import Producto from "./paginas/Producto.jsx";
import EditarProducto from "./paginas/EditarProducto.jsx";
import NuevoProducto from "./paginas/NuevoProducto.jsx";
import NuevoColaborador from "./paginas/NuevoColaborador.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ProductosProvider>
                        <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path="registrar" element={<Registrar />} />
                                <Route path="olvide-password" element={<OlvidePassword />} />
                                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                            </Route>

                            {/* //Rutas protegidas */}
                            <Route path="/productos" element={<RutaProtegida />}>
                                <Route index element={<Productos />}></Route>
                                <Route path="crear-producto" element={<NuevoProducto />}></Route>
                                <Route path="agregar-colaborador/:id" element={<NuevoColaborador />}></Route>
                                <Route path=":id" element={<Producto />}></Route>
                                <Route path="editar/:id" element={<EditarProducto />}></Route>
                            </Route>
                        </Routes>
                    </ProductosProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App
