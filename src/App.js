import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import SiteHeader from './components/site-header';
import Root from './regions/root';
import Scala from './regions/scala';
import Vector from './regions/vector';
import Graphium from './regions/graphium';


if (module.hot) module.hot.accept();


function App() {
  return (
    <BrowserRouter basename="/">
      <Route path="/" component={World} />
    </BrowserRouter>
  );
}


function World() {

  return (
    <>
      <SiteHeader />
      <main>
        <Switch>
          <Route path="/scala" component={Scala} />
          <Route path="/vector" component={Vector} />
          <Route path="/graphium" component={Graphium} />
          <Route path="/" component={Root} />
          <Redirect to="/" />
        </Switch>
      </main>
      {/*<footer>footer</footer>*/}
    </>
  );
}


export default App;
