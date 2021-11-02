import "./App.css";

// components
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Movies from "./components/movies/Movies";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import Tv from "./components/tv/Tv";
import RestrictedRoute from "./components/restricedRoute/RestrictedRoute";
import { useEffect, useState } from "react";

function App() {
  const history = useHistory();
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [token]);

  // logout function to log out the user
  const logout = async () => {
    await localStorage.removeItem("userToken");
    setToken(null);
    history.push("/home");
  };
  // localstorage token
  const getLoginToken = async (token) => {
    await localStorage.setItem("userToken", token);
    setToken(token);
  };

  return (
    <div>
      <Navbar isLogged={isLogged} logout={logout} />
      <Switch>
        <RestrictedRoute path="/home" component={Home} />
        <RestrictedRoute path="/movies" component={Movies} />
        <RestrictedRoute path="/tv" component={Tv} />
        <Route path="/login">
          <Login getLoginToken={getLoginToken} history={history} />
        </Route>
        {/* <Route path="/login" component={Login} loginToken={loginToken} history={history} /> */}
        <Route path="/register" component={Register} />
        <Redirect exact from="/" to="/register" />
      </Switch>
    </div>
  );
}

export default App;
