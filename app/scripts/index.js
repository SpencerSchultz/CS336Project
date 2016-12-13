import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import LinkBox from './linkBox';
import LinkEdit from './linkEdit';

import '../css/base.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={LinkBox}/>
    <Route path='/:id' component={LinkEdit} />
  </Router>
),
  document.getElementById('content')
);
