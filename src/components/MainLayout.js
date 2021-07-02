/* eslint-disable */
import { Outlet } from 'react-router-dom';
// import { experimentalStyled } from '@material-ui/core';
import MainNavbar from './MainNavbar';
import styled from 'styled-components';

// const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   display: 'flex',
//   height: '100%',
//   overflow: 'hidden',
//   width: '100%'
// }));

// const MainLayoutWrapper = experimentalStyled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
//   paddingTop: 64
// });

// const MainLayoutContainer = experimentalStyled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden'
// });

// const MainLayoutContent = experimentalStyled('div')({
//   flex: '1 1 auto',
//   height: '100%',
//   overflow: 'auto'
// });

const MainLayoutRoot = styled('div')`
  backgroundcolor: white;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const MainLayoutWrapper = styled('div')`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
  paddingtop: 64;
`;

const MainLayoutContainer = styled('div')`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
`;

const MainLayoutContent = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  overflow: auto;
`;

const MainLayout = (props) => {
  console.log('theme layout', props.theme);
  return (
    <MainLayoutRoot>
      <MainNavbar />
      <MainLayoutWrapper>
        <MainLayoutContainer>
          <MainLayoutContent>
            <Outlet />
          </MainLayoutContent>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  );
};

export default MainLayout;
