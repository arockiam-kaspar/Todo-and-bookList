import React, { Component, Suspense } from 'react';
import ItemList from './components/ItemList';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const Books = React.lazy(() => import('./components/Books'));

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route path="/" exact component={ItemList} />
        <Route path="/books" exact 
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Books />
            </Suspense>
          )} 
        />
      </div>
    </Router>  
    );
  }
}

export default App;
