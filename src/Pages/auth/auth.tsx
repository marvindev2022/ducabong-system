import { useAuth } from "../../Context/auth.context";
import FormSignin from "../../components/Signin";
import { FormSignup } from "../../components/Signup";

export default function RenderAuth() {
  const { selectedOption,setSelectedOption } = useAuth();
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-secondary bg-[url(https://img.freepik.com/fotos-premium/ia-generativa-e-composicao-do-centro-de-pecas-automotivas_28914-15484.jpg)] bg-cover bg-no-repeat bg-center">
      <div className="w-96 h-96 bg-white rounded-xl flex flex-col ">
        <nav className="w-full flex justify-center items-center">
          <button
            onClick={() =>
              setSelectedOption("signin")
            }
            className={`w-1/2 h-10 rounded-tl-xl font-bold text-white ${selectedOption === "signin" ? "bg-primary" : "bg-secondary"}`}
          >
            Entrar
          </button>
          <button
            onClick={() =>
              setSelectedOption("signup")
            }
            className={`w-1/2 h-10 rounded-tr-xl font-bold text-white ${selectedOption === "signup" ? "bg-primary" : "bg-secondary"}`}
          >
            Cadastrar
          </button>
        </nav>
        {selectedOption === "signin" && <FormSignin />}
        {selectedOption === "signup" && <FormSignup />}
      </div>
    </section>
  );
}
