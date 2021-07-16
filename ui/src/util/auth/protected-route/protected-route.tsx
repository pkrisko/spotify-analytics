import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../auth-context';

type ProtectedRouteProps  = React.HTMLAttributes<HTMLDivElement> & {
  path: string;
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
