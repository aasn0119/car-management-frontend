import { toast } from "react-toastify";

export const showToast = (id, message, type) => {
  toast.update(id, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    closeButton: true,
  });
};

export const showWarnToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message);
};
