import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Welcome from './pages/Welcome';
import Form from './pages/Form';
import Result from './pages/Result';
import FindQR from './pages/FindQR';

function App() {

  return (
    
    <Router>
      <Switch>
        <Route path='/welcome' exact component={Welcome} />
        <Form path='/form' />
        <Result path='/result' />
        <Route path='/findmyqr' component={FindQR} />
      </Switch>
    </Router>
  );
}

export default App;
