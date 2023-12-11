import { createContext, useContext } from 'react';
import ApiClient from './ApiClient';
import { ChildrenProp } from 'src/types/common';

type ApiContextContent = ApiClient | undefined

type ApiProviderProps = {
  children: ChildrenProp
}

const ApiContext = createContext<ApiContextContent>(undefined);

export default function ApiProvider(props: ApiProviderProps) {
  const api = new ApiClient();

  return (
    <ApiContext.Provider value={api}>
      {props.children}
    </ApiContext.Provider>
  );
}

export function useApi(): ApiContextContent {
  return useContext(ApiContext);
}