import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../util/auth/auth-context";

export const LoginPage =() => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    // @ts-ignore
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        // @ts-ignore
      auth.signin(() => {
        // @ts-ignore
        history.replace(from);
      });
    };
  
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={login}>Log in</button>
      </div>
    );
  }