import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTE from 'constants/route';

const Home = lazy(() => import('pages/home'));
const ExpenditureRanking = lazy(() => import('pages/expenditureRanking'));
const CreateBill = lazy(() => import('pages/createBill'));

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={ROUTE.HOME} component={Home}/>
        <Route exact path={ROUTE.EXPENDITURE_RANKING} component={ExpenditureRanking}/>
        <Route exact path={ROUTE.CREATE_BILL} component={CreateBill}/>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;