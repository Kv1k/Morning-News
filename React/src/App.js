import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import wishList from'./wishlist.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({wishList}));



function App() {
  return (
    <Provider store= {store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/articles/:id" component={ScreenArticlesBySource} />
          <Route path="/my-articles" component={ScreenMyArticles} />
          <Route path="/article-source" component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
