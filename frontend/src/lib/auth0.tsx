import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

export const Auth0ProviderWrapper = ({ children }: Auth0ProviderWrapperProps) => {
  if (!domain || !clientId) {
    console.error("❌ Missing Auth0 environment variables. Check your .env file.");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
       redirect_uri: window.location.origin,
       audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
      cacheLocation="localstorage" // keep user logged in after refresh
    >
      {children}
    </Auth0Provider>
  );
};
console.log("Auth0 domain:", domain);
console.log("Auth0 clientId:", clientId);
