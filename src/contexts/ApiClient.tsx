import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from 'js-cookie';
import { Parameters, useConfig } from "../hooks/config/useConfig";
import { BackendResponse } from "src/types/api";
import { QueryClient, } from '@tanstack/react-query'

const ACCESS_TOKEN_COOKIE_NAME = "nat";
const REFRESH_TOKEN_COOKIE_NAME = "rat";

interface RetryConfig extends AxiosRequestConfig {
  retry?: number;
}

/**
 * Global configuration for API client.
 * Used as fallback configuration for all requests.
 */
const globalConfig: RetryConfig = {
  retry: 3,
};

/**
 * ApiClient class
 * Used to connect to the API
 */
export default class ApiClient {
  config: {
    get: (name: Parameters) => string | undefined;
  };
  base_url: string;
  instance: AxiosInstance;
  _accessToken: string | undefined;
  refreshToken: string | undefined;
  queryClient: QueryClient

  constructor() {
    this.config = useConfig()
    this.base_url = this.config.get(Parameters.API_URL) as string;
    this.instance = axios.create({
      baseURL: this.base_url
    });
    this._accessToken = undefined;
    this.refreshToken = undefined;

    this.#init401Interceptor();
    this.connect()
    this.queryClient = new QueryClient()
  }


  /**
 * init the authorisation error interceptor
 * will try to refresh the access token if a refresk token exists
 */
  #init401Interceptor(): void {

    const onResponseError = async (error: AxiosError ): Promise<AxiosError> => {
      const { config } = error
      const originalRequest = config as RetryConfig | undefined 

      if (!originalRequest || !originalRequest.retry) {
        return Promise.reject(error);
      }

      const status: number = (error.response) ? error.response.status : 0;
      

      if (originalRequest.url !== "/auth/refresh" && status === 401  && originalRequest.retry > 0) {
        originalRequest.retry = 0;
        if (this.refreshToken && this.refreshToken !== "") { 
          const success = await this.refreshAccessToken();
          if (success && originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${this.accessToken}`;
          }
          return this.instance(originalRequest);
        }
      }
      return Promise.reject(error);
    }

    const onResponse = (response: AxiosResponse): AxiosResponse => {
      return response;
    }

    this.instance.interceptors.response.use(onResponse, onResponseError)
  }

  get accessToken(): string {
    return this._accessToken as string;
  }

  set accessToken(newToken: string) {
    this._accessToken = newToken;
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
  }

  /**
   * try to refresh the access token
   * @returns {boolean} returns true if the access token has been refreshed, false otherwise
   */
  async refreshAccessToken(): Promise<boolean> {
    try {
      if (!this.refreshToken) {
        return false;
      }
      const res = await axios.post(`${this.base_url}/auth/refresh`, {
        token: this.refreshToken
      });
      if (res.status === 200) {
        this.accessToken = res.data.access_token;
        this.#saveTokens();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * save the access and refresh tokens in cookies
   */
  #saveTokens(): void {
    Cookies.set(ACCESS_TOKEN_COOKIE_NAME, this.accessToken, { expires: 10 });
    Cookies.set(REFRESH_TOKEN_COOKIE_NAME, this.refreshToken as string, { expires: 365 })
  }
  
  /**
   * Connects to the API.
   * 
   * @returns {boolean} Returns true if the connection is successful, otherwise false.
   */
  connect(): boolean {
    if (this.accessToken) {
      return true;
    } else {
      const access_token = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
      if (access_token) {
        this.accessToken = access_token;
        return true;
      } 
    }
    return false;
  }

  /**
   * Logs in the user with the provided email and code.
   * @param email - The user's email.
   * @param code - The login code.
   * @returns A promise that resolves to a boolean indicating whether the login was successful.
   */
  async login(email: string, code: number): Promise<boolean> {
    try {
      const loginResponse = await axios.post(`${this.base_url}/auth/login`, { //TODO: set type for loginResponse
        email: email,
        password: code
      });
      if (loginResponse.status === 200) {
        this.accessToken = loginResponse.data.access_token;
        this.refreshToken = loginResponse.data.refresh_token;
        this.#saveTokens();
        Cookies.set("user_email", email, { expires: 365 });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Sends a POST request to the specified URL with the provided data.
   * 
   * @template T The type of the response data.
   * @template D The type of the response metadata.
   * @param {string} url The URL to send the request to.
   * @param {T} data The data to send with the request.
   * @param {AxiosRequestConfig<T> | undefined} config The optional configuration for the request.
   * @returns {Promise<AxiosResponse<T, D>>} A promise that resolves to the response from the server.
   */
  async postRequest<T = any, D = any>(url: string, data: T, config: AxiosRequestConfig<T> | undefined): Promise<AxiosResponse<T, D>> {
    return this.instance.post<any, AxiosResponse<T, D>, T>(url, data, config || globalConfig)
  }

  /**
   * Sends a PUT request to the specified URL with the provided data.
   * 
   * @template T The type of the response data.
   * @template D The type of the response data's additional properties.
   * @param {string} url The URL to send the request to.
   * @param {T} data The data to send with the request.
   * @param {AxiosRequestConfig<T> | undefined} config The configuration for the request.
   * @returns {Promise<AxiosResponse<T, D>>} A promise that resolves to the response from the server.
   */
  async putRequest<T = any, D = any>(url: string, data: T, config: AxiosRequestConfig<T> | undefined): Promise<AxiosResponse<T, D>> {
    return this.instance.put<any, AxiosResponse<T, D>, T>(url, data, config || globalConfig)
  }

  /**
   * Sends a DELETE request to the specified URL with optional configuration.
   * 
   * @template T The type of the response data.
   * @template D The type of the response data's additional properties.
   * @param {string} url The URL to send the DELETE request to.
   * @param {AxiosRequestConfig<T> | undefined} config Optional configuration for the request.
   * @returns {Promise<AxiosResponse<T, D>>} A promise that resolves to the response.
   */
  async deleteRequest<T = any, D = any>(url: string, config: AxiosRequestConfig<T> | undefined): Promise<AxiosResponse<T, D>> {
    return this.instance.delete<any, AxiosResponse<T, D>, T>(url, config || globalConfig)
  }

  /**
   * Sends a GET request to the specified URL.
   * 
   * @template T - The type of the response data.
   * @template D - The type of the response metadata.
   * @param {string} url - The URL to send the request to.
   * @param {AxiosRequestConfig<T> | undefined} config - The configuration for the request.
   * @returns {Promise<AxiosResponse<T, D>>} - A promise that resolves to the response.
   */
  async getRequest<T = any, D = any>(url: string, config: AxiosRequestConfig<T> | undefined): Promise<AxiosResponse<T, D>> {
    return this.instance.get<any, AxiosResponse<T, D>, T>(url, config || globalConfig)
  }

  /**
   * Sends a POST request to the specified URL with the given payload and configuration.
   * @template T The type of the payload.
   * @param {string} url The URL to send the request to.
   * @param {T} payload The payload to send with the request.
   * @param {AxiosRequestConfig<T> | undefined} config The configuration for the request.
   * @returns {BackendResponse<T>} The response from the backend.
   */
  async postHandler<T>(url: string, payload: T, config: AxiosRequestConfig<T> | undefined): BackendResponse<T> {
    let err: Error | null = null;
    const resp = await this.postRequest<T>(url, payload, config)
      .catch(e => {
        err = e;
      }) as AxiosResponse<T>
    if (err ) {
      return [null, err]
    } else if (resp.status >= 200 && resp.status < 205) {
      return [resp.data, null]
    } else {
      return [null, new Error(resp.statusText)]
    }
  }

  /**
   * Sends a PUT request to the specified URL with the given payload and configuration.
   * @template T The type of the payload.
   * @param {string} url The URL to send the request to.
   * @param {T} payload The payload to send with the request.
   * @param {AxiosRequestConfig<T> | undefined} config The configuration for the request.
   * @returns {BackendResponse<T>} The response from the backend.
   */
  async putHandler<T>(url: string, payload: T, config: AxiosRequestConfig<T> | undefined): BackendResponse<T> {
    let err: Error | null = null;
    const resp = await this.putRequest<T>(url, payload, config)
      .catch(e => {
        err = e;
      }) as AxiosResponse<T>
    if (err) {
      return [null, err]
    } else if (resp.status >= 200 && resp.status < 205) {
      return [resp.data, null]
    } else {
      return [null, new Error(resp.statusText)]
    }
  }

  /**
   * Deletes a resource from the server.
   * 
   * @template T - The type of data expected in the response.
   * @param url - The URL of the resource to delete.
   * @param config - Optional configuration for the request.
   * @returns A BackendResponse indicating the success or failure of the delete operation.
   */
  async deleteHandler(url: string, config: AxiosRequestConfig<boolean> | undefined): BackendResponse<boolean> {
    let err: Error | null = null;
    const resp = await this.deleteRequest(url, config)
      .catch(e => {
        err = e;
      }) as AxiosResponse<boolean>
    if (err) {
      return [false, err]
    } else if (resp.status === 204) {
      return [true, null]
    } else {
      return [null, new Error(resp.statusText)]
    }
  }

  /**
   * Retrieves data from the backend using the specified URL and configuration.
   * @template T The type of data to be retrieved.
   * @param {string} url The URL to send the request to.
   * @param {AxiosRequestConfig<T> | undefined} config The configuration for the request.
   * @returns {Promise<BackendResponse<T>>} A promise that resolves to the backend response.
   */
  async getHandler<T>(url: string, config: AxiosRequestConfig<T> | undefined): BackendResponse<T> {
    let err: Error | null = null;
    const resp = await this.getRequest<T>(url, config)
      .catch(e => {
        err = e;
      }) as AxiosResponse<T>

    if (err) {
      console.error('getHandler', url, err);
      return [null, err];
    }

    if (resp.status >= 200 && resp.status < 205) {
      return [resp.data, null];
    } else {
      return [null, new Error(resp.statusText)]
    }
  }

}