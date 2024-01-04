import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import {
  promiseToast,
} from "../utils/notifications";
import { getItem } from "../utils/storage";

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
    password: string;
    confirm: string;
  };
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setFormInputsSignupState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
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
  const token = getItem("token");
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
  useEffect(() => {
    const performRequest = async () => {
      if(token) return
      await promiseToast(
        axios
          .create({
            baseURL: "https://barber-c95q.onrender.com/",
            timeout: 60000,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .get("/"),
        "Conectando ao servidor",
        "Online"
      );
    };

    performRequest();
  }, []);

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
