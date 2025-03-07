import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Layout />,
    document.body.appendChild(document.createElement('div')),
  )
});
