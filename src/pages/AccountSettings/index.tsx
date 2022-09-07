import { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { AccountCircleOutlined, KeyOutlined, SafetyCheckOutlined } from '@mui/icons-material';

import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Sessions from './Sessions';

// -------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// -------------------------------------------------------------------

export default function AccountSettings() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper elevation={0} sx={{ mb: 3, px: 2, minWidth: 650, borderRadius: '8px' }}>
        <Tabs centered value={value} onChange={handleChange}>
          <Tab icon={<AccountCircleOutlined />} iconPosition="start" label="Profile" />
          <Tab icon={<KeyOutlined />} iconPosition="start" label="Change Password" />
          <Tab icon={<SafetyCheckOutlined />} iconPosition="start" label="Sessions" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Sessions />
      </TabPanel>
    </>
  );
}
