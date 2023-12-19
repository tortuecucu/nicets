import { createContext, useContext } from 'react';
import ApiClient from './ApiClient';
import { ChildrenProp } from 'src/types/common';

type ApiContextContent = ApiClient 

type ApiProviderProps = {
  children: ChildrenProp
}

const api = new ApiClient();
const ApiContext = createContext<ApiContextContent>(api);

/**
 * Provides the API context for the application.
 * @param props The props for the ApiProvider component.
 */
export default function ApiProvider(props: ApiProviderProps) {
  return (
    <ApiContext.Provider value={api}>
      {props.children}
    </ApiContext.Provider>
  );
}

export function useApi(): ApiContextContent {
  return useContext<ApiContextContent>(ApiContext) as ApiContextContent;
}