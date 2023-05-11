import {
  createContext,
  useContext,
} from "react";

const AppContext = createContext(null);

const AppContextProvider = ({ children, value }) => {
  return (
    <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
