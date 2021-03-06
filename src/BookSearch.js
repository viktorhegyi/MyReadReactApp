import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BookSearch extends Component {

  state = {
    query: '',
    books: [],
  }

  // update the data for the books
  updateData = (books) => {
    const curBooks = books.map(book => {
      book.shelf = "none";
      this.props.currentBooks.forEach(book2add => {
        if (book.id === book2add.id) {
          book.shelf = book2add.shelf;
        }
      })
      return book;
    })
    this.setState({
      books: curBooks
    })
  }

  // update the query when the user types in search bar
  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      BooksAPI.search(query).then((books) => {
        books.length > 0 ? this.updateData(books) : this.setState({books:[]})
      }).catch((e)=> {
      console.error(`API error: ${e}`); // catch if there is any error
    })
    }
    else
    {this.setState({books:[]})}
  }

  // update the shelf for book
  updateBooks = (book, shelf)=> {
    let current = this.state.books;
    const bookToUpdate = current.filter(curBook => curBook.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: current
    })
    this.props.updateShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{width: 128, height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBooks(book, e.target.value);
                      }}>
                      <option disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                <div className="book-authors">
                  {book.authors}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookSearch;
