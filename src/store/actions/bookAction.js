import Axios from 'axios';

// export const GET_TITLES = 'GET_TITLES';
export const GET_BOOKS_AUTHOR_GENRE_TITLE = 'GET_BOOKS_AUTHOR_GENRE_TITLE';
export const GET_BOOK = 'GET_BOOK';
export const GET_LOW_STOCK = 'GET_LOW_STOCK';
export const TITLE_LOADING_TRUE = 'TITLE_LOADING_TRUE';
export const TITLE_LOADING_FALSE = 'TITLE_LOADING_FALSE';
export const BOOK_LOADING_TRUE = 'BOOK_LOADING_TRUE';
export const BOOK_LOADING_FALSE = 'BOOK_LOADING_FALSE'

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
    
    // const saveTitles = (data) => {
    //     return {
    //         type: GET_TITLES,
    //         data : data
    //     }
    // }
    
    // export const getTitles = (title) => {
    
    //     return (dispatch) => {
    //         Axios.get('books/searchbook/'+title)
    //         .then(res => {
    //             console.log(res.data);
    //             if(res.data !== null){
    //               return dispatch(saveTitles(res.data));
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }
}