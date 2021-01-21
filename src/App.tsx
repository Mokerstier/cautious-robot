import React from 'react';
import $ from './styles.module.scss';
import { Switch, Route } from 'react-router-dom';
import { routes } from 'src/routes';
import Aside from 'src/ui/components/aside';

const App = () => {
  return (
    <div className={$.app}>
      <Aside />
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
    </div>
  );
}

export default App
