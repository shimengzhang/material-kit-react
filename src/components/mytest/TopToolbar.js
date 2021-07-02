/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const StylesToggleButton = withStyles(({ palette }) => ({
  root: {
    padding: '5px 20px !important',
    borderRadius: '3px !important',
    border: '1px solid rgba(0,0,0,0.5) !important'
  },
  selected: {
    backgroundColor: `${palette.warning.main} !important`
  }
}))(ToggleButton);

const TopToolbar = ({ status, handleStatus }) => {
  return (
    <Box style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '10px' }}>
      <Grid container style={{ margin: 0 }} spacing={3}>
        <Grid item style={{ padding: 0 }} xs={3}>
          <ToggleButtonGroup
            value={status}
            exclusive
            onChange={handleStatus}
            aria-label="text alignment"
          >
            <StylesToggleButton
              size="large"
              value="left"
              aria-label="left aligned"
            >
              浏览
            </StylesToggleButton>
            <StylesToggleButton
              size="large"
              value="center"
              aria-label="centered"
            >
              选择
            </StylesToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item style={{ padding: 0 }} xs={9}>
          <TextField
            size="small"
            style={{ width: '400px', marginRight: '5px' }}
            id="standard-basic"
            label="输入 url"
          />
          <Button variant="contained">加载页面</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopToolbar;
