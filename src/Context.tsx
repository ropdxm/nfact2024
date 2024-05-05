import { createContext, useContext as aaaaaaaaa, useState, PropsWithChildren } from "react";

const context = createContext<any>(null);

function Context({ children }: PropsWithChildren) {
    const [user, setUser] = useState();
  
    const contextValues = {
      user,
      setUser
    };
    
    return <context.Provider value={contextValues}>{children}</context.Provider>;
  }
  
export const useContext = () => {
    return aaaaaaaaa(context);
};
  
  export default Context;
  