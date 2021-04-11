import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRouter from './Router/MainRouter'
import history from './history';

function App() {
  return (
    <Router history={history}>
      <MainRouter />
      <ToastContainer autoClose={1500} />
    </Router>
  );
}

export default App;
