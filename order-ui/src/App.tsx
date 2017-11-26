import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Route from './routerUtils/Route';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { store } from './Store';
import { AppWrap } from './components/Pages/App/AppWrap';
import { DashBoard } from './components/Pages/Backend/Dashboard';
import { Shop } from './components/Pages/Backend/Shop';
import { Orders } from './components/Pages/Backend/Orders';
import { Profile } from './components/Pages/Backend/Profile';

import './App.css';

const theTheme = createMuiTheme({
  direction: 'ltr',
  typography: {
    fontFamily: 'Montserrat, Roboto, Lato, sans-serif',
    fontSize: 30
  }
});

class App extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <MuiThemeProvider theme={theTheme}>
          <div className="App">
            <Route component={<AppWrap classes={{}} {...this.props} />} exact={false} >
              <Route component={<Profile classes={{}} />} path="/Profile" exact={true} />
              <Route component={<DashBoard classes={{}} />} path="/dashboard" exact={false} />
              <Route component={<Shop />} path="/shop" exact={true} />
              <Route component={<Orders />} path="/orders" exact={true} />
            </Route>
          </div>
        </MuiThemeProvider>
      </ReactRedux.Provider>
    );
  }
}

export default App;
