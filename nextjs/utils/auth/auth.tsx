import { FC, createContext, useContext, useState } from 'react';

export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

export const AuthContext = createContext({
    tokens: {
        accessToken: '',
        refreshToken: '',
    },
    storeTokens: (tokens : Tokens) => {},
});

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [tokens, setTokens] = useState({
        accessToken: '',
        refreshToken: '',
    });

    const storeTokens = (tokens: Tokens): void => {
        setTokens(tokens);
    };
  
    return {
      tokens,
      storeTokens,
    };
}

type ProvideAuthProps = React.HTMLAttributes<HTMLElement>;

export const ProvideAuth: FC<ProvideAuthProps> = (props: ProvideAuthProps) => {
    const auth = useProvideAuth();
    return (
      <AuthContext.Provider value={auth}>
        {props.children}
      </AuthContext.Provider>
    );
  }

// 1. Parse parameters from URL. If none, redirect user to page to login.
// 2. Send user to /api/login
// 3. User is redirected back with stuff in url params
// 4. Parse those params, and immediately redirect user to /api/callback
// 5. User comes back with a refresh_token and access_token.
// 6. Save those in state? useContext?

// TBD figure out refresh token logic
