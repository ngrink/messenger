import { createContext, useContext } from "react";
import { configurePersistable } from 'mobx-persist-store';
import { injectStores } from '@mobx-devtools/tools';

import { AuthStore } from "@/shared/modules/auth";
import { SearchStore } from "@/modules/search";
import { ChatsStore } from "@/modules/chats";


const authStore = new AuthStore();
const searchStore = new SearchStore();
const chatsStore = new ChatsStore(authStore, searchStore);

export const store = {
  authStore,
  searchStore,
  chatsStore,
}

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext)
}

configurePersistable(
  {
    storage: window.localStorage,
    expireIn: 3600000 * 24 * 30,
    removeOnExpiration: true,
    stringify: false,
    debugMode: true,
  },
  { delay: 0, fireImmediately: false }
);

injectStores(store);