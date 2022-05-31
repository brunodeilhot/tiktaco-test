declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_RECIPE_IMAGE_PATH: string;
      REACT_APP_AVATAR_IMAGE_PATH: string;
      REACT_APP_IMAGE_FORMATS: string[];
      REACT_APP_IMAGE_PLACEHOLDER: string;
      REACT_APP_HOSTNAME: string;
      REACT_APP_API_KEY: string;
      REACT_APP_API_HOSTNAME: string;
      REACT_APP_DOMAIN: string;
      REACT_APP_CLIENT_ID: string;
    }
  }
}

export {};
