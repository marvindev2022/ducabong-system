import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IContextProps {
  children: ReactNode;
}
interface IService {
  id: number;
  name: string;
  price: string;
}
export interface IProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  countInStock: number;
}
const services: IService[] = [ ]
const products: IProduct[] = [ ]

interface ClientStates {
  dashboardRef: React.RefObject<HTMLDivElement>;
  openDash: Boolean;
  setOpenDash: React.Dispatch<React.SetStateAction<boolean>>;
  sectionSelected: string;
  setSectionSelected: React.Dispatch<React.SetStateAction<string>>;
  filterServices: IService[];
  setFilterServices: React.Dispatch<React.SetStateAction<IService[]>>;
  inputSearch: string | undefined;
  setInputSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterProducts: IProduct[];
  setFilterProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const ClientContext = createContext<ClientStates | undefined>(undefined);

export const ClientProvider: React.FC<IContextProps> = ({ children }) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [openDash, setOpenDash] = useState<boolean>(false);
  const [sectionSelected, setSectionSelected] = useState<string>("Serviços");
  const [filterServices, setFilterServices] = useState<IService[]>(services);
  const [filterProducts, setFilterProducts] = useState<IProduct[]>(products);
  const [inputSearch, setInputSearch] = useState<string | undefined>();
  useEffect(() => {
    setFilterServices(
      services.filter((service) =>
        service.name
          .toLowerCase()
          .includes(inputSearch?.toLowerCase() as string)
      )
    );
    setFilterProducts(
      products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(inputSearch?.toLowerCase() as string)
      )
    )
    if (!inputSearch) {
      setFilterServices(services);
      setFilterProducts(products);
    }
    

  }, [inputSearch]);
  const ClientContextValue: ClientStates = {
    dashboardRef,
    openDash,
    setOpenDash,
    sectionSelected,
    setSectionSelected,
    filterServices,
    setFilterServices,
    inputSearch,
    setInputSearch,
    filterProducts,
    setFilterProducts,
  };

  return (
    <ClientContext.Provider value={ClientContextValue}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
