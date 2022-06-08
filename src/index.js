import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import app from './index.jsx';

const init = () => {
  const container = document.getElementById('chat');
  // const root = ReactDOM .createRoot(container);

  app()
    .then((vdom) => {
      ReactDOM.render(vdom, container);
    });
};

init();
