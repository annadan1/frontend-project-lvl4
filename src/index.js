import { createRoot } from 'react-dom/client';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import app from './index.jsx';

const init = () => {
  const container = document.getElementById('chat');
  const root = createRoot(container);

  app()
    .then((vdom) => {
      root.render(vdom);
    });
};

init();
