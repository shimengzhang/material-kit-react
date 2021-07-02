/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '20px',
    minWidth: '120px'
  }
}));

const BpEdit = ({ showDraw, setShowDraw }) => {
  const [bpType, setBpType] = React.useState('');

  const handleBpTypeChange = (event) => {
    setBpType(event.target.value);
  };

  const [bpRange, setBpRange] = React.useState('');

  const handleBpRangeChange = (event) => {
    setBpRange(event.target.value);
  };

  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      style={{
        width: '300px'
      }}
      open={showDraw}
      onClose={() => {
        setShowDraw(false);
      }}
    >
      <Box>
        <Container maxWidth="sm">
          <Typography variant="h4" style={{ width: '500px', margin: '20px 0' }}>
            埋点元素
          </Typography>
          <Divider />
          <Box style={{ marginTop: '20px' }}>
            <div>
              <TextField
                size="small"
                style={{ width: '400px' }}
                id="standard-basic"
                label="元素名称"
              />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="label">埋点类型</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bpType}
                  onChange={handleBpTypeChange}
                >
                  <MenuItem value={1}>点击</MenuItem>
                  <MenuItem value={2}>曝光</MenuItem>
                  <MenuItem value={3}>点击+曝光</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="label">埋点范围</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bpRange}
                  onChange={handleBpRangeChange}
                >
                  <MenuItem value={1}>当前元素</MenuItem>
                  <MenuItem value={2}>同级元素</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
};

export default BpEdit;
