/* eslint-disable */
import React, { useEffect, useState } from 'react';
import BpEdit from 'src/components/mytest/BpEdit';
import LoadIframe from 'src/components/mytest/LoadIframe';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Mytest = (props) => {
  const [showDraw, setShowDraw] = React.useState(true);

  useEffect(() => {
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
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <LoadIframe />
        <BpEdit showDraw={showDraw} setShowDraw={setShowDraw} />
      </Container>
    </Box>
  );
};

export default Mytest;
