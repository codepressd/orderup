import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Route from './routerUtils/Route';

import { store } from './Store';
import { AppWrap } from './components/Pages/App/AppWrap';
import { DashBoard } from './components/Pages/Backend/Dashboard';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <div className="App">
          <Route component={<AppWrap {...this.props} />} exact={false} >
            <div>This shit should work</div>
            <Route component={<DashBoard />} path="/" exact={false} />
          </Route>
        </div>
      </ReactRedux.Provider>
    );
  }
}

export default App;
