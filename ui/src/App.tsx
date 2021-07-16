import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import logo from './logo.svg';
import './App.css';
import { ProvideAuth } from './util/auth/auth-context';
import { AuthButton } from './components/auth-button';
import { IndexPage } from './pages/index';
import { LoginPage } from './pages/login/login';
import { ProtectedRoute } from './util/auth/protected-route';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <IndexPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute path="/protected">
              <DashboardPage />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
