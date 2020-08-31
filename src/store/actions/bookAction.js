import Axios from 'axios';

// export const GET_TITLES = 'GET_TITLES';
export const GET_BOOKS_AUTHOR_GENRE_TITLE = 'GET_BOOKS_AUTHOR_GENRE_TITLE';
export const GET_BOOK = 'GET_BOOK';
export const GET_LOW_STOCK = 'GET_LOW_STOCK';
export const TITLE_LOADING_TRUE = 'TITLE_LOADING_TRUE';
export const TITLE_LOADING_FALSE = 'TITLE_LOADING_FALSE';
export const BOOK_LOADING_TRUE = 'BOOK_LOADING_TRUE';
export const BOOK_LOADING_FALSE = 'BOOK_LOADING_FALSE';
export const GET_SEARCHED_BOOK = 'GET_SEARCHED_BOOK';
export const SEARCHED_BOOK_LOADING_TRUE = 'SEARCHED_BOOK_LOADING_TRUE';
export const SEARCHED_BOOK_LOADING_FALSE = 'SEARCHED_BOOK_LOADING_FALSE';
export const NEW_BOOK_LOADING_TRUE = 'NEW_BOOK_LOADING_TRUE';
export const NEW_BOOK_LOADING_FALSE = 'NEW_BOOK_LOADING_FALSE';
export const GET_NEW_BOOKS = 'GET_NEW_BOOKS';

const bookTitlesArray=(data)=>{
    return{
        type:GET_BOOKS_AUTHOR_GENRE_TITLE,
        data
    }
}

const titleLoadingTrue = () => {
    return {
        type:TITLE_LOADING_TRUE
    }
}

const titleLoadingFalse = () => {
    return {
        type:TITLE_LOADING_FALSE
    }
}

const bookLoadingTrue = () => {
    return {
        type:BOOK_LOADING_TRUE
    }
}

const bookLoadingFalse = () => {
    return {
        type:BOOK_LOADING_FALSE
    }
}

export const getBooksTitlesArray = (authorId,genreId) => {
    // console.log(authorId,genreId);
    return (dispatch) => {
        dispatch(titleLoadingTrue());
        Axios.post('books/adminsearch',{
            authorId,
            genreId})
            .then(res => {
                if(res.data.response === true ){
                    // console.log(res.data);
                    dispatch(bookTitlesArray(res.data.data));
                    dispatch(titleLoadingFalse());
                }
            })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        
const lowstocks = (data) => {
    return({
        type : GET_LOW_STOCK,
        data : data
    })
}

export const getLowStockBooks = () => {
    // console.log('getting');
    return (dispatch) => {
        Axios.get('books/lowstock')
        .then(res => {
            // console.log(res)
            if(res.data.response === true ){
                // console.log(res.data);
                return dispatch(lowstocks(res.data.data));
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const saveBook = (data) => {
    return {
        type:GET_BOOK,
        data
    }
}

const saveSearchedBooks = (data) => {
    return {
        type:GET_SEARCHED_BOOK,
        data
    }
}

const searchedBookLoadingTrue = () => {
    return {
        type:SEARCHED_BOOK_LOADING_TRUE
    }
}
const searchedBookLoadingFalse = () => {
    return {
        type:SEARCHED_BOOK_LOADING_FALSE
    }
}

export const searchbook = (keyword) => {
    return(dispatch) => {
        dispatch(searchedBookLoadingTrue());
        Axios.get('books/searchbook/'+keyword)
        .then(res => {
            // console.log(res.data);
            if(res.data.response === true){
                // console.log(res.data)
                dispatch(saveSearchedBooks(res.data.data))
                dispatch(searchedBookLoadingFalse());
            } else {
                dispatch(saveSearchedBooks({}))
                dispatch(searchedBookLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(searchedBookLoadingFalse());
        })
    }
}

export const getBook = (bookId) => {
    // console.log(bookId);
    return (dispatch) => {
        dispatch(bookLoadingTrue());
        Axios.get('books/read/'+bookId)
        .then(res => {
            // console.log(res);
            if(res.data !== null){
                dispatch(saveBook(res.data));
                dispatch(bookLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const newBooksLoadingTrue = () => {
    return {
        type:NEW_BOOK_LOADING_TRUE
    }
}

const newBooksLoadingFalse = () => {
    return {
        type:NEW_BOOK_LOADING_FALSE
    }
}

const saveNewBooks = (data) => {
    return {
        type: GET_NEW_BOOKS,
        data
    }
}

export const newArrivals = () => {
    return (dispatch) => {
        dispatch(newBooksLoadingTrue());
        Axios.get('books/newarrivals')
        .then(res => {
            // console.log(res);
            if(res.data !== null){
                dispatch(saveNewBooks(res.data.data));
                dispatch(newBooksLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}