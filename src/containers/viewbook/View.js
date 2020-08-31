import React, { Component } from "react";
import { connect } from "react-redux";
import * as bookActionType from "../../store/actions/bookAction";
import classes from "./View.module.css";
import Axios from "axios";

class View extends Component {
  componentDidMount() {
    this.props.getBook(this.props.match.params.bookId);
  }
  addToCart = () => {
    if (this.props.isLogged) {
      let token = JSON.parse(localStorage.getItem("userDetails")).token;
      Axios.post(
        "items/add",
        {
          bookId: this.props.match.params.bookId,
          quantity: 1,
        },
        {
          headers: { HTTP_AUTHORIZATION: token },
        }
      )
        .then((res) => {
          if (res.data.response === true) {
            alert("Added to cart");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.history.push("/login");
    }
  };
  buy = () => {
    if (this.props.isLogged) {
      let token = JSON.parse(localStorage.getItem("userDetails")).token;
      Axios.post(
        "items/add",
        {
          bookId: this.props.match.params.bookId,
          quantity: 1,
        },
        {
          headers: { HTTP_AUTHORIZATION: token },
        }
      )
        .then((res) => {
          if (res.data.response === true) {
            this.props.history.push("/buy");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.history.push("/login");
    }
  };
  render() {
    return (
      <div className={classes.Section}>
        <div className={classes.Body}>
          <div className={classes.BookCover}>
            <img src={this.props.book.imageUrl} width="150px" height="200px" />
          </div>
          <div className={classes.Title}>
            <h1>{this.props.book.title}</h1>
            <h4>
              Written By :{" "}
              <span style={{ color: "#444", fontStyle: "italic" }}>
                {this.props.book.authorName}
              </span>
            </h4>
            <h4>
              Published By :{" "}
              <span style={{ color: "#444", fontStyle: "italic" }}>
                {this.props.book.publisherName}
              </span>
            </h4>
            <h3 style={{ textAlign: "left" }}>
              {this.props.book.stock > 0 ? (
                <span style={{ color: "green" }}>In Stock</span>
              ) : (
                <span style={{ color: "red" }}>Out Of Stock</span>
              )}
            </h3>
            <h5>Rs. {this.props.book.price}</h5>
            <div className={classes.Buttons}>
              <button onClick={this.addToCart}>Add to Cart</button>
              <button onClick={this.buy}>Buy Now</button>
            </div>
          </div>
          <div className={classes.BookDetails}>
            <h3>About Book</h3>
            <p>{this.props.book.description}</p>
            <h3>Book Details</h3>
            <table>
              <tbody>
                <tr>
                  <td className={classes.Spec}>Author</td>
                  <td>{this.props.book.authorName}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Publisher</td>
                  <td>{this.props.book.publisherName}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>ISBN</td>
                  <td>{this.props.book.isbn}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Published On</td>
                  <td>{this.props.book.publishedOn}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Language</td>
                  <td>{this.props.book.language}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Price</td>
                  <td>{this.props.book.price}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Genre</td>
                  <td>{this.props.book.genreName}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Returnable</td>
                  <td>{this.props.book.returnable}</td>
                </tr>
                <tr>
                  <td className={classes.Spec}>Binding</td>
                  <td>{this.props.book.binding}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={classes.Button}>
          <button
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.loginReducer.loggedIn,
    book: state.bookReducer.book,
    bookLoading: state.bookReducer.bookLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (id) => dispatch(bookActionType.getBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
