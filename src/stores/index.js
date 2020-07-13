import AuthStore from "./auth";
import UserStore from './user';
import ImageStore from './image';
import HistoryStore from './history'
import {createContext, useContext} from "react";

const context = createContext({
    AuthStore, UserStore, ImageStore,HistoryStore
});

// window.stores = {AuthStore, UserStore};

export const useStores = () => useContext(context);
