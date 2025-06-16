import React, { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface AuthCtx {
  sucessToast: string;
  setSucessToast: React.Dispatch<React.SetStateAction<string>>;
  errorToast: string;
  setErrorToast: React.Dispatch<React.SetStateAction<string>>;
  userId: string | null;
  setUserId: (id: string) => void;
}

export const AuthContext = createContext<AuthCtx>({
  sucessToast: "",
  setSucessToast: () => {},
  errorToast: "",
  setErrorToast: () => {},
  userId: "",
  setUserId: () => {},
} as AuthCtx);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sucessToast, setSucessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  return (
    <AuthContext.Provider
      value={{
        sucessToast,
        setSucessToast,
        errorToast,
        setErrorToast,
        userId,
        setUserId,
      }}
    >
      <Snackbar
        open={!!sucessToast}
        autoHideDuration={5000}
        onClose={() => setSucessToast("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={1}
      >
        <Alert
          onClose={() => setSucessToast("")}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sucessToast}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorToast}
        autoHideDuration={5000}
        onClose={() => setErrorToast("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={2}
      >
        <Alert
          onClose={() => setErrorToast("")}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorToast}
        </Alert>
      </Snackbar>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
