// ToastContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = "info") => {
    const toastId = "unique-toast"; // same ID -> prevents duplicates

    if (!toast.isActive(toastId)) {
      toast(message, {
        toastId,
        type,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
      });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook for easier usage
export const useToast = () => useContext(ToastContext);
