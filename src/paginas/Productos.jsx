import useProductos from "../hooks/useProductos";
import PreviewProducto from "../components/PreviewProducto";
import Alerta from "../components/Alerta";
const Productos = () => {

  const { productos, alerta} = useProductos();

  const {msg } = alerta

  return (
    <>
      <h1 className="text-4xl font-black">Productos</h1>
      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg ">
        {productos.length ? productos.map (producto => (
          <PreviewProducto 
            key={producto._id}
            producto={producto}
          />
        )) :  <p className=" text-center text-gray-600 uppercase p-5">No hay productos</p>}
      </div>
    </>
  )
}

export default Productos