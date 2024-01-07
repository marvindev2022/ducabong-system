import { signupSchema } from "../schema/user.schema";
import { useAuth } from "../Context/auth.context";
import instance from "../service/instance";
import { useState } from "react";
import { notifyError } from "../utils/notifications";

export function FormSignup() {
  const [steap, setSteap] = useState(1);
  const {
    inputCpf,
    inputEmail,
    inputPassword,
    inputConfirm,
    inputNome,
    formInputsSignupState,
    setFormInputsSignupState,
  } = useAuth();
  const inputRefs = {
    name: inputNome,
    email: inputEmail,
    password: inputPassword,
    confirm: inputConfirm,
  };
  const resetBorderColor = () => {
    const inputs = [inputNome, inputEmail, inputPassword, inputConfirm];

    inputs.forEach((input) => {
      input && input.current && (input.current.style.border = "1px solid #ccc");
    });
  };
  const handleValidateEmail = async (email: string,cpf:string) => {
 
   try {
    const { data } = await instance.post("/users/validate/data", { email,cpf:cpf.replace(/\D/g, '') });
    console.log(data)
    if (data.status >= 400) {
     inputEmail.current && (inputEmail.current.style.border = "1px solid red");
     notifyError(data.message)
    }else{
      setSteap(2)
    }
   } catch (error:any) {
    console.log(error)
    notifyError(error.message)
   }


  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetBorderColor();
    const validate = signupSchema.validate(formInputsSignupState, {
      abortEarly: false,
    });
    if (validate.error) {
      validate.error.details.forEach((err) => {
        const input = inputRefs[err.context?.key as keyof typeof inputRefs];
        input &&
          input.current &&
          (input.current.style.border = "1px solid red");
      });
    }
    async function fetchSignup() {
      try {
        const {cpf,email,name,password,} = formInputsSignupState
      const { data } = await instance.post("/users/registered", {email,name,password, cpf:cpf.replace(/\D/g, '')});

      if (data.status >= 400) {
        notifyError(data.message);
      }
    } catch (error:any) {
      console.log(error)
    }
  }
  fetchSignup();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-8 items-center mt-5"
    >
      {steap === 1 && (
        <>
          <input
            ref={inputNome}
            type="text"
            name="name"
            placeholder="Nome"
            className="w-64 h-10 border border-x-transparent border-t-transparent border-b-black placeholder-black placeholder:font-bold"
            onChange={(e) => {
              setFormInputsSignupState({
                ...formInputsSignupState,
                name: e.target.value,
              });
            }}
          />
          <input
            ref={inputEmail}
            type="text"
            name="email"
            placeholder="Email"
            className="w-64 h-10 border border-x-transparent border-t-transparent border-b-black placeholder-black placeholder:font-bold"
            onChange={(e) => {
              setFormInputsSignupState({
                ...formInputsSignupState,
                email: e.target.value,
              });
            }}
          />
          <input 
          ref={inputCpf} 
          type="text"
          name="cpf"
          placeholder="CPF"
          className="w-64 h-10 border border-x-transparent border-t-transparent border-b-black placeholder-black placeholder:font-bold"
          onChange={(e) => {
            setFormInputsSignupState({
              ...formInputsSignupState,
              cpf: e.target.value,
            });
          }
        }
           />
        </>
      )}
      {steap === 2 && (
        <>
          <input
            ref={inputPassword}
            type="password"
            name="password"
            placeholder="Password"
            className="w-64 h-10 border border-x-transparent border-t-transparent border-b-black placeholder-black placeholder:font-bold"
            onChange={(e) => {
              setFormInputsSignupState({
                ...formInputsSignupState,
                password: e.target.value,
              });
            }}
          />
          <input
            ref={inputConfirm}
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="w-64 h-10 border border-x-transparent border-t-transparent border-b-black placeholder-black placeholder:font-bold"
            onChange={(e) => {
              setFormInputsSignupState({
                ...formInputsSignupState,
                confirm: e.target.value,
              });
            }}
          />
        </>
      )}

      <button
      onClick={() => steap === 1 && handleValidateEmail(formInputsSignupState.email,formInputsSignupState.cpf)}
        type="submit"
        className="bg-primary w-64 h-10 rounded-xl font-bold text-white"
      >
        {steap === 1 ? "Próximo" : "Cadastrar"}
      </button>
    </form>
  );
}
