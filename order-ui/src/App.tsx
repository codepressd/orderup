import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Route from './routerUtils/Route';

import { store } from './Store';
import { AppWrap } from './components/Pages/App/AppWrap';
import { DashBoard } from './components/Pages/Backend/Dashboard';
import { Shop } from './components/Pages/Backend/Shop';
import { Orders } from './components/Pages/Backend/Orders';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <div className="App">
          <Route component={<AppWrap classes={{}} {...this.props} />} exact={false} >
            <Route component={<DashBoard classes={{}} />} path="/dashboard" exact={false} />
            <Route component={<Shop />} path="/shop" exact={true} />
            <Route component={<Orders />} path="/orders" exact={true} />
          </Route>
        </div>
      </ReactRedux.Provider>
    );
  }
}

export default App;
