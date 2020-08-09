import Axios from 'axios';

// export const GET_TITLES = 'GET_TITLES';
export const GET_BOOKS_AUTHOR_GENRE_TITLE = 'GET_BOOKS_AUTHOR_GENRE_TITLE';
export const GET_BOOK = 'GET_BOOK';
 
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

const bookTitlesArray=(data)=>{
    return{
        type:GET_BOOKS_AUTHOR_GENRE_TITLE,
        data
    }
}

export const getBooksTitlesArray = (authorId,genreId) => {
    // console.log(authorId,genreId);
    return (dispatch) => {
                Axios.post('books/adminsearch',{
                    authorId,
                    genreId})
                .then(res => {
                    if(res.data.response === true ){
                        // console.log(res.data);
                      return dispatch(bookTitlesArray(res.data.data));
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
        Axios.get('books/read/'+bookId)
        .then(res => {
            // console.log(res);
            if(res.data !== null){
                return dispatch(saveBook(res.data));
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}