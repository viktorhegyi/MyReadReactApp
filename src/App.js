import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import './App.css'

class BooksApp extends Component {
  // the books
  state = {
    books: []
  };

  //call the BookAPI.js to get books
  componentDidMount() {
    this.updateData()
  }

  //change the books on the shelves
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData()
    })
  }

  //update the books in state
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
        {/* navigate to search page */}
        <Route
        path="/search"
        render={() =>
        <BookSearch updateShelf={this.updateShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
