import {
  BrowserRouter as
  Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import CreateUserAccount from './pages/CreateUserAccount';
import ImportUserAccount from './pages/ImportUserAccount';
import Transaction from './pages/Transaction';
import './styles/app.css';

export default function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className='app__container'>
          <Switch>
            <Route exact path='/createaccount' component={CreateUserAccount} />
            <Route exact path='/importaccount' component={ImportUserAccount} />
            <Route exact path='/transaction' component={Transaction} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}