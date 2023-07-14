import React, { useState } from 'react';
import './App.css';
import { Login } from "./components/login/login";
import { BlackListForm } from "./components/blacklist-form/blacklist-form";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { adjustTokenKey } from "./consts";

function App() {
  const [token, setToken] = useState(localStorage.getItem(adjustTokenKey) ?? "")

  const loginCallback = (token: string) => {
    localStorage.setItem(adjustTokenKey, token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem(adjustTokenKey)
    setToken("")
  }

  return (
    <Provider store={store}>
      {token.length ? <Box display="flex" flexDirection="row-reverse"><Button onClick={() => logout()}>Logout</Button></Box> : ""}
      <Box display="flex" alignItems="center" justifyContent="center">
        {token.length ? <BlackListForm /> : <Login setLoginCallback={loginCallback}/>}
      </Box>
    </Provider>
  );
}

export default App;
