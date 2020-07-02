import AuthStore from "./auth";
import {createContext,useContext} from "react";

const context = createContext({
    AuthStore: new AuthStore()
})

export const useStores = ()=>useContext(context);
