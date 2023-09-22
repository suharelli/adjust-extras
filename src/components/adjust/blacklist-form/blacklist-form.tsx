import { FC, FormEvent, useRef, useState } from "react";
import { Alert, AlertTitle, Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export interface BlacklistFormProps {
  action: MutationTrigger<any>
  actionText: string
  successText: string
}

export const BlackListForm: FC<BlacklistFormProps> = ({action, actionText, successText}) => {
  const [blocked, setBlocked] = useState<string[]>([])
  const idListRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<{ id: string, value: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)


  const blockCampaigns = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const idList = idListRef.current
      ? idListRef.current.value.split("\n")
      : []

    const toBlock = idList.map(v => v.trim()).filter(v => v.length)

    setLoading(true)

    await Promise.all(toBlock.map(async id => action(id)
      .unwrap()
      .then(() => {
        setBlocked(prev => [...prev.filter(v => v !== id), id])
      })
      .catch(error => {
        setErrors(prev => [...prev.filter(v => v.id !== id), {id, value: `${id}: ${error.error ?? error.data?.error}`}])
      })
    ))

    setLoading(false)
  }

  const closeError = (id: string) => {
    setErrors(prev => prev.filter(v => v.id !== id))
  }

  const closeBlocked = (id: string) => {
    setBlocked(prev => prev.filter(v => v !== id))
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
        <LoadingButton loading={loading} type="submit" variant="outlined">{actionText}</LoadingButton>
        {blocked.map(id => <Alert key={id} onClose={() => closeBlocked(id)} severity={"success"}>{id} {successText}</Alert>)}
        {errors.map(v => <Alert key={v.id} onClose={() => closeError(v.id)}
                                severity={"error"}><AlertTitle>Error</AlertTitle>{v.value}</Alert>)}
      </Stack>
    </Box>
  </Box>
}
