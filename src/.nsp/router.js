import React ,{Fragment}from "react";
import {Route} from "react-router-dom"
import Loadable from "nsploadable"

const Nsp_ = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_' */ '../page/')
});

const routes = [
  {
    path: "../page/",
    component: <Nsp_ />
  },
] 

class App extends React.Component {
  render () {
    return (
      <Fragment>
        {routes.map(item => (
          <Route path={item.path} exact key={item.path}>
            {item.component}
          </Route>
        ))}
      </Fragment>
    );
  }
}

export default App;