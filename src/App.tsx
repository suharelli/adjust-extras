import './App.css';
import { Login } from "./components/login/login";
import { BlackListForm } from "./components/blacklist-form/blacklist-form";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button } from "@mui/material";
import { authSlice } from "./reducers/auth.slice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function App() {
  const {adjustToken} = useAppSelector(state => state.auth)
  const {setAdjustToken, logout} = authSlice.actions
  const dispatch = useAppDispatch()

  const loginCallback = (login: string) => {
    dispatch(setAdjustToken({token: login}))
  }

  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <>
      {adjustToken.length ?
        <Box display="flex" flexDirection="row-reverse"><Button onClick={logoutCallback}>Logout</Button></Box> : ""}
      <Box display="flex" alignItems="center" justifyContent="center">
        {adjustToken.length ? <BlackListForm/> : <Login setLoginCallback={loginCallback}/>}
      </Box>
    </>
  );
}

export default App;
