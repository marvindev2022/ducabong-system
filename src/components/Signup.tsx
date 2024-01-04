import { signupSchema } from "../../../schema/user.schema";
import { useAuth } from "../Context/auth.context";
import instance from "../service/instance";

export function FormSignup() {
  const {
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
      const { data } = await instance.post("/signup", formInputsSignupState);

      if (data.status >= 400) {
        alert(data.message);
      }
    }
    fetchSignup();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-8 items-center mt-5"
    >
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

      <button
        type="submit"
        className="bg-primary w-64 h-10 rounded-xl font-bold text-white"
      >
        Cadastrar
      </button>
    </form>
  );
}
