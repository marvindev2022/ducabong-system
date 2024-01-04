import { toast } from "react-toastify";

export const notifySucess = (message:string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    closeOnClick: true,
    pauseOnHover: false,
  });
};

export const notifyError = (message:string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyInfo = (message:string) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyWarning = (message:string) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};


export const promiseToast = (
  promise: Promise<any>,
  pendingMessage: string,
  successMessage: string,
) => {
  return  toast.promise(promise, {
    pending: pendingMessage,
    success: successMessage,
    error: {
      render: ({ data }:any) => {
        let response = data.message === "Network Error" ? 'Erro de conexão com o servidor' : data.response?.data?.message ?? data.message;
        return `Erro: ${response}`;
      },
    },
  }, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    theme: "light",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};