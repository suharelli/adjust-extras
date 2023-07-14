import { FC, FormEvent, useRef } from "react";
import {Box, Button, Stack, TextField} from "@mui/material";

export interface LoginProps {
    setLoginCallback: (login: string) => void
}

export const Login: FC<LoginProps> = ({ setLoginCallback }) => {
    const loginRef = useRef<HTMLInputElement>(null)

    const onFormSubmit = (e: FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        setLoginCallback(loginRef.current?.value || "")
    }

    return <Box
        component="form"
        onSubmit={onFormSubmit}
        alignItems="center"
        display="flex"
        sx={{height: "100vh"}}
    >
        <Stack direction="row" spacing={2}>
            <TextField variant="outlined" inputRef={loginRef} label="Token" size="small" />
            <Button type="submit" variant="outlined">Login</Button>
        </Stack>
    </Box>
}
