import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  inputNome: React.RefObject<HTMLInputElement>;
  inputTelefone: React.RefObject<HTMLInputElement>;
  inputCpf: React.RefObject<HTMLInputElement>;
  inputNascimento: React.RefObject<HTMLInputElement>;
  inputEmail: React.RefObject<HTMLInputElement>;
  inputPassword: React.RefObject<HTMLInputElement>;
  inputConfirm: React.RefObject<HTMLInputElement>;
  formInputsSignupState: {
    name: string;
    email: string;
    cpf: string;
    password: string;
    confirm: string;
  };
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setFormInputsSignupState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      cpf: string;
      password: string;
      confirm: string;
    }>
  >;
  setFormInputsSigninState: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  formInputsSigninState: {
    email: string;
    password: string;
  };
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<string>("signin");
  const inputNome = useRef<HTMLInputElement>(null);
  const inputTelefone = useRef<HTMLInputElement>(null);
  const inputCpf = useRef<HTMLInputElement>(null);
  const inputNascimento = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputConfirm = useRef<HTMLInputElement>(null);
  const [formInputsSignupState, setFormInputsSignupState] = useState({
    name: "",
    email: "",
    cpf:"",
    password: "",
    confirm: "",
  });
  const [formInputsSigninState, setFormInputsSigninState] = useState({
    email: "",
    password: "",
  });

  const authContextValue: AuthState = {
    inputNome,
    inputTelefone,
    inputCpf,
    inputNascimento,
    inputEmail,
    inputPassword,
    inputConfirm,
    formInputsSignupState,
    selectedOption,
    setSelectedOption,
    setFormInputsSignupState,
    setFormInputsSigninState,
    formInputsSigninState,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
