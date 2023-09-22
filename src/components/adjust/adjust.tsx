import React, { FC, SyntheticEvent, useState } from "react";
import { Box, Tab } from "@mui/material";
import { adjustApi } from "../../api/adjust.api";
import { BlackListForm } from "./blacklist-form/blacklist-form";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const Adjust: FC = () => {
  const [blackListRequest] = adjustApi.useBlackListMutation()
  const [unblackListRequest] = adjustApi.useUnblacklistMutation()

  const [activeTab, setActiveTab] = useState('block')

  const handleActiveTabChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleActiveTabChange}>
            <Tab label="Block" value="block" />
            <Tab label="Unblock" value="unblock" />
          </TabList>
        </Box>
        <TabPanel value="block">
          <BlackListForm action={blackListRequest} actionText="Block" successText="blocked" />
        </TabPanel>
        <TabPanel value="unblock">
          <BlackListForm action={unblackListRequest} actionText="Unblock" successText="unblocked" />
        </TabPanel>
      </TabContext>
    </Box>
  )
}