
export default function RenderHome() {
  return (
    <section className="w-screen h-screen flex flex-col  items-center bg-white">
      <header className="w-full h-24 flex justify-between items-center px-5 p-0">
        <img
          src="https://t3.ftcdn.net/jpg/06/38/27/66/360_F_638276621_QSD9V64nuBDBH5iMKShvc3U1Iia0sbrl.jpg"
          alt="logo"
          className="w-20 h-20 rounded-full"
        />
        <nav className="flex justify-center items-center text-xl">
          <ul>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Estoque
            </li>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Vendas
            </li>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Clientes
            </li>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Fornecedores
            </li>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Relatorios
            </li>
            <li className="inline-block px-4 py-2 text-black hover:text-gray-800 font-semibold">
              Configurações
            </li>
          </ul>
        </nav>
        <nav className="flex justify-center items-center gap-10">
          <h1 className="text-xl font-semibold">Bem vindo, Marcus </h1>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sair
          </button>
        </nav>
      </header>
    </section>
  );
}
