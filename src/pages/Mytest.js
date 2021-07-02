/* eslint-disable */
import React, { useEffect, useState } from 'react';
import TopToolbar from 'src/components/mytest/TopToolbar';
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: `20px !important`,
    minWidth: '120px !important'
  }
}));

const Mytest = (props) => {
  const [status, setStatus] = React.useState('left');

  const handleStatus = (event, newAlignment) => {
    setStatus(newAlignment);
  };

  const [showDraw, setShowDraw] = React.useState(true);
  const [bpType, setBpType] = React.useState('');

  const handleBpTypeChange = (event) => {
    setBpType(event.target.value);
  };

  const [bpRange, setBpRange] = React.useState('');

  const handleBpRangeChange = (event) => {
    setBpRange(event.target.value);
  };

  const classes = useStyles();

  useEffect(() => {
    document.domain = 'autohome.com.cn';
    var iframe = document.getElementById('myiframe');

    // 给 iframe 插入  script 标签
    function insertScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//dev.autohome.com.cn:5000/test/circle.js';
      iframe.contentWindow.document.body.appendChild(script);
    }

    iframe.onload = () => {
      insertScript();
    };

    // 接收来自 iframe 点选事件发送的 message
    window.addEventListener('message', ({ data }) => {
      if (data.xpath) {
        console.log('receive', data);
        setShowDraw(true);
      }
    });
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {/* <TopToolbar status={status} handleStatus={handleStatus} /> */}
        <Box>
          <iframe
            id="myiframe"
            src="//local.autohome.com.cn:8000/automall/newcar/newcar"
            width="375"
            height="667"
            frameBorder="3"
            style={{
              marginTop: '100px',
              marginLeft: '50%',
              transform: 'translateX(-50%)'
            }}
          ></iframe>
        </Box>
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
              <Typography
                variant="h4"
                style={{ width: '500px', margin: '20px 0' }}
              >
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
      </Container>
    </Box>
  );
};

export default Mytest;
