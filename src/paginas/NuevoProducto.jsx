import FormularioProductos from "../components/FormularioProductos";

const NuevoProducto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Producto</h1>
      <div className="mt-10 flex justify-center">
            <FormularioProductos />
      </div>
    </>
  )
}

export default NuevoProducto