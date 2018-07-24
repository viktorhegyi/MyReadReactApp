import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.updateData()
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }

  updateData = () => {
    BooksAPI.getAll().then(book => {
            this.setState({
              books: book
            })
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList currentBooks={this.state.books} />} />
        <Route
        path="/search"
        render={() =>
        <BookSearch updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
