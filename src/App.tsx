import './App.css';
import { Login } from "./components/login/login";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Link } from "@mui/material";
import { authSlice } from "./reducers/auth.slice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Adjust } from "./components/adjust/adjust";
import GitHubIcon from "@mui/icons-material/GitHub";

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
        {adjustToken.length ? <Adjust/> : <Login setLoginCallback={loginCallback}/>}
      </Box>
      <Link
        className="github-link"
        href="https://github.com/suharelli/adjust-extras"
        target="_blank"
        rel="noopener"
        color="inherit"
      >
        <GitHubIcon className="github-link_icon"></GitHubIcon>
      </Link>
    </>
  );
}

export default App;
