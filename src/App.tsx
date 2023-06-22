import React, {useState} from 'react';
import './App.css';
import {Login} from "./components/login/login";
import {BlackListForm} from "./components/blacklist-form/blacklist-form";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Box} from "@mui/material";

function App() {
  const [token, setToken] = useState("")

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {token.length ? <BlackListForm token={token} /> : <Login setLoginCallback={token => setToken(token)} />}
    </Box>
  );
}

export default App;
