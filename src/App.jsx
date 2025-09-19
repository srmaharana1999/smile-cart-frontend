import React from "react";

import { Header } from "components/commons";
import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "./route";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact component={ProductList} path={routes.products.index} />
      <Route exact component={Product} path={routes.products.show} />
      <Redirect exact from="/" to={routes.root} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
