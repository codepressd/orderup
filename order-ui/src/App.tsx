import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Route from './routerUtils/Route';

import { store } from './Store';
import { AppWrap } from './components/Pages/App/AppWrap';
import { DashBoard } from './components/Pages/Backend/Dashboard'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          <Route component={<AppWrap />} exact={false} />
          <Route component={<DashBoard />} path="/brah" exact={false} />
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </ReactRedux.Provider>
    );
  }
}

export default App;
