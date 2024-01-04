import { useClient } from "../../Context/Client.context";
import menu from "../../../../assets/menu.svg";

export default function RenderHamburgerMenu(){
  const {openDash,setOpenDash} = useClient()
    const toggleMobileMenu = () => {
     if(openDash){
       setOpenDash(false)
      }else{
        setOpenDash(true)
      }
    };
  return <span
  className="block lg:hidden text-[2rem] cursor-pointer absolute text-white ml-4 mt-2 z-50"
  onClick={toggleMobileMenu}
>
  <img src={menu} alt="menu" />
</span>
}