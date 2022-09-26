import { styled } from '@mui/material/styles';
import { Tabs, TabsProps } from '@mui/material';

// ========================// CustomTabs //======================== //

const CustomTabs = styled((props: TabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 25,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

export default CustomTabs;
