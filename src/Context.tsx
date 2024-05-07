import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext as aaaaaaaaa, useState, PropsWithChildren, useEffect } from "react";
import { auth } from "./firebase";

const context = createContext<any>(null);

function Context({ children }: PropsWithChildren) {
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const contextValues = {
      user,
      setUser
    };

    useEffect(() => {
      // Subscribe to the authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUser(user as any);
        } else {
          // User is signed out
          setUser(null);
        }
        // Set loading to false once authentication state is determined
        setLoading(false);
      });
  
      // Unsubscribe from the authentication state changes when the component is unmounted
      return () => unsubscribe();
    }, []);
    
    return <context.Provider value={contextValues}>
       {loading ? (
        <div>
          <p style={{color: "azure"}}>loading...</p>
        </div>
      ) : (
        children
      )}
      </context.Provider>;
  }
  
export const useContext = () => {
    return aaaaaaaaa(context);
};
  
  export default Context;
  