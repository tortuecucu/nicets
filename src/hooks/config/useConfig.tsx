import configData from "../../config.json";

interface Map {
    [key: string]: string | undefined
}

export enum Parameters {
    SERVER_URL = 'SNOW_URL',
    SNOW_URL = "SNOW_URL",
    SNOW_PUBLIC_INCIDENT_PAGE = "SNOW_PUBLIC_INCIDENT_PAGE",
    HOME_URL = "HOME_URL",
    API_URL = "API_URL",
    INCT_REGEX = "INCT_REGEX"
  };

const useConfig = () => {
    const data: Map = configData
    const get = (name: Parameters): string | undefined => {
        try {
            return data[name]
        } catch (e) {
            console.error(e)
            return undefined
        }
    }

    return { get }
}

export { useConfig }