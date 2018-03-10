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
import { Login } from './components/Pages/Frontend/Login';
import { Signup } from './components/Pages/Frontend/Signup';

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
              <Route component={<Login classes={{}} />} path="/login" exact={true} />
              <Route component={<Signup classes={{}} />} path="/signup" exact={true} />
              <Route component={<Profile classes={{}} />} path="/profile" exact={true} />
              <Route component={<DashBoard classes={{}} />} path="/dashboard" exact={false} />
              <Route component={<Shop />} path="/shop" exact={true} />
              <Route component={<Orders classes={{}} />} path="/orders" exact={true} />
            </Route>
          </div>
        </MuiThemeProvider>
      </ReactRedux.Provider>
    );
  }
}

export default App;
