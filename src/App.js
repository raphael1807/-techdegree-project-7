import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

// App components
import Nav from './components/header/nav';
import Search from './components/header/search';
import PhotoContainer from './components/photocontainer/photocontainer';
import NotFound from './components/photocontainer/notfound';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      catsPhotos: [],
      dogsPhotos: [],
      birdsPhotos: [],
      inputPhotos: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch("dogs");
    this.performSearch("birds");
  }

  performSearch = (query = 'cats') => {
    this.setState({ loading: true })
    axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (query === "cats") {
          console.log('Cats');
          this.setState({
            catsPhotos: response.data.photos.photo,
            loading: false
          });
        } else if (query === "dogs") {
          console.log('Dogs');
          this.setState({
            dogsPhotos: response.data.photos.photo,
            loading: false
          });
        } else if (query === "birds") {
          console.log('Birds');
          this.setState({
            birdsPhotos: response.data.photos.photo,
            loading: false
          });
        } else {
          this.setState({
            inputPhotos: response.data.photos.photo,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cats" />} />
            <Route
              path="/cats"
              render={() => <PhotoContainer loading={this.state.loading} data={this.state.catsPhotos} />}
            />
            <Route
              path="/dogs"
              render={() => <PhotoContainer loading={this.state.loading} data={this.state.dogsPhotos} />}
            />
            <Route
              path="/birds"
              render={() => <PhotoContainer loading={this.state.loading} data={this.state.birdsPhotos} />}
            />
            <Route
              exact path={"/search/:query"}
              render={() => <PhotoContainer loading={this.state.loading} data={this.state.inputPhotos} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div >
      </BrowserRouter >
    );
  }
}
