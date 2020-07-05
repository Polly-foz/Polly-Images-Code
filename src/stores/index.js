import AuthStore from "./auth";
import UserStore from './user'
import {createContext,useContext} from "react";

const context = createContext({
    AuthStore,UserStore
})

window.stores = {AuthStore,UserStore}

export const useStores = ()=>useContext(context);
