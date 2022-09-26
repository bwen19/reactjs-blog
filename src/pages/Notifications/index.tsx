import { styled } from '@mui/material/styles';
import { AppBar, Container, Paper } from '@mui/material';
import { AccountSection, AppToolbar } from '@/components';

// -------------------------------------------------------------------

const Wrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: 80,
  [theme.breakpoints.up('sm')]: {
    paddingTop: 96,
  },
}));

// ========================// Notifications //======================== //

export default function Notifications() {
  return (
    <Wrapper>
      <AppBar color="dark">
        <AppToolbar>
          <AccountSection />
        </AppToolbar>
      </AppBar>
      <MainContainer maxWidth="lg">
        <Paper elevation={0} sx={{ height: 50 }}>
          Notifications
        </Paper>
      </MainContainer>
    </Wrapper>
  );
}
