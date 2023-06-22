import React, {useRef, useState} from "react";
import axios, {AxiosError} from "axios";
import {Box, List, ListItem, ListItemText, Stack, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";

export interface BlacklistFormProps {
    token: string
}

export const BlackListForm: React.FC<BlacklistFormProps> = ({ token }) => {
    const [blocked, setBlocked] = useState<string[]>([])
    const idListRef = useRef<HTMLTextAreaElement>(null)
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const blockCampaigns = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const idList = idListRef.current
            ? idListRef.current.value.split("\n")
            : []

        const toBlock = idList.map(v => v.trim()).filter(v => v.length)

        setLoading(true)

        await Promise.all(toBlock.map(async id => {
            try {
                await axios.post(
                    `https://api.adjust.com/dashboard/api/trackers/${id}/blacklist`,
                    {},
                    {
                        headers: {
                            Authorization: `Token token=${token}`
                        }
                    }
                )

                setBlocked(prev => [...prev, id])
            } catch (error) {
                if (error instanceof AxiosError) {
                    const message = error.message
                    setErrors(prev => [...prev, `${id}: ${message}`])
                }
            }
        }))

        setLoading(false)
    }

    return <Box>
        <Box component="form" onSubmit={blockCampaigns}>
            <Stack direction="column" spacing={2}>
                <TextField
                    multiline
                    inputRef={idListRef}
                    minRows="3"
                    variant="outlined"
                    label="List of ids"
                    maxRows="10"
                />
                <LoadingButton loading={loading} type="submit" variant="outlined">Block</LoadingButton>
            </Stack>
        </Box>
        <List>
            {blocked.map(v => (<ListItem dense={true} key={v}><ListItemText>{v} blocked</ListItemText></ListItem>))}
        </List>
        <List>
            {errors.map(v => <ListItem dense={true} key={v}><ListItemText>{v}</ListItemText></ListItem>)}
        </List>
    </Box>
}
