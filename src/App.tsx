import React from 'react';
import $ from './styles.module.scss';
import { Switch, Route } from 'react-router-dom';
import { routes } from 'src/routes';
import Aside from 'src/ui/components/aside';

const App = () => {
  return (
    <div className={$.app}>
      <header className={$.header}>
        <h1>Data Driven World</h1> 
      </header>
      <Aside />
      <main>
          <Switch>
              {routes.map(({ path, component: C }) => (
                  <Route
                      key={path}
                      exact
                      path={path}
                      component={C}
                  />
              ))}
          </Switch>
      </main>
    </div>
  );
}

export default App
