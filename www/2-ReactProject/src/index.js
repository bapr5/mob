import React from 'react';
import { createRoot } from 'react-dom/client';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import './index.css';

const root = createRoot(document.getElementById('app'));
root.render(
<div>
      <h1>
    Hello, world!
      </h1>
    <div class="root">
    <Component1 />
    <Component2 />
  </div>
  </div>
);