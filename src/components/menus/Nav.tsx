import { useClient } from "../../Context/Client.context";

export default function RenderNav() {
  const { setSectionSelected,sectionSelected } = useClient();
  return (
    <nav className="w-full h-20 flex flex-col items-center text-black ">
      <ul className="w-full flex flex-row gap-5  pt-4 px-5 ">
        <li onClick={()=>setSectionSelected("Serviços")} className={`w-full text-[1rem] text-center cursor-pointer ${sectionSelected === "Serviços" && "text-primary underline font-extrabold"}`}>
          Serviços
        </li>
        <li onClick={()=>setSectionSelected("Produtos")} className={`w-full text-[1rem] text-center cursor-pointer ${sectionSelected === "Produtos" && "text-primary underline font-extrabold"}`}>
          Produtos
        </li>
        <li onClick={()=>setSectionSelected("Agenda")} className={`w-full text-[1rem] text-center cursor-pointer ${sectionSelected === "Agenda" && "text-primary underline font-extrabold"}`}>
          Agenda
        </li>
      </ul>
    </nav>
  );
}
