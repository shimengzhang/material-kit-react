import React from 'react';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line
const Child = ({ children }) => (
  <div>
    {children}
    <div>child</div>
  </div>
);

export default Child;
