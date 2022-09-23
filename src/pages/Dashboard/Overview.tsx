import React from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

export default function Overview() {
  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'normal' }}>
          Data overview
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item xs={6} md={4}>
          <Paper elevation={0} sx={{ height: 100, bgcolor: 'grey.100', p: 1 }}>
            Number of articles
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper elevation={0} sx={{ height: 100, bgcolor: 'grey.100' }} />
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper elevation={0} sx={{ height: 100, bgcolor: 'grey.100' }} />
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper elevation={0} sx={{ height: 100, bgcolor: 'grey.100' }} />
        </Grid>
      </Grid>
    </>
  );
}
