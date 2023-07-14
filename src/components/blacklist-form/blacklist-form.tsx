import { FC, FormEvent, useRef, useState } from "react";
import { Alert, AlertTitle, Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { adjustApi } from "../../api/adjust.api";


export const BlackListForm: FC = () => {
  const [blocked, setBlocked] = useState<string[]>([])
  const idListRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<{id: string, value: string}[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [blackListRequest] = adjustApi.useBlackListMutation()


  const blockCampaigns = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const idList = idListRef.current
      ? idListRef.current.value.split("\n")
      : []

    const toBlock = idList.map(v => v.trim()).filter(v => v.length)

    setLoading(true)

    await Promise.all(toBlock.map(async id => blackListRequest(id)
      .unwrap()
      .then(() => {
        setBlocked(prev => [...prev.filter(v => v !== id), id])
      })
      .catch(error => {
        setErrors(prev => [...prev.filter(v => v.id !== id), { id, value: `${id}: ${error.error}` }])
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
        <LoadingButton loading={loading} type="submit" variant="outlined">Block</LoadingButton>
        {blocked.map(id => <Alert key={id} onClose={() => closeBlocked(id)} severity={"success"}>{id} blocked</Alert>)}
        {errors.map(v => <Alert key={v.id} onClose={() => closeError(v.id)} severity={"error"}><AlertTitle>Error</AlertTitle>{v.value}</Alert>)}
      </Stack>
    </Box>
  </Box>
}
