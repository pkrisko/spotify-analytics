import React, { FC, createContext, useState, ReactNode, useContext } from 'react';

const fakeAuth = {
    isAuthenticated: false,
    signin: (cb: any) => {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout: (cb: any) => {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

function useProvideAuth() {
    const [user, setUser] = useState('');
  
    const signin = (cb: any) => {
      return fakeAuth.signin(() => {
        setUser('user');
        cb();
      });
    };
  
    const signout = (cb: any) => {
      return fakeAuth.signout(() => {
        setUser('');
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }

type ProvideAuthProps = React.HTMLAttributes<HTMLDivElement>;

export const authContext = createContext({
    user: {},
    signin: () => {},
    signout: (x: any) => {},
});

export const useAuth =() => useContext(authContext);

export const ProvideAuth: FC<ProvideAuthProps> = (props: ProvideAuthProps) => {
  const auth = useProvideAuth();
  return (
    // @ts-ignore
    <authContext.Provider value={auth}>
      {props.children}
    </authContext.Provider>
  );
}