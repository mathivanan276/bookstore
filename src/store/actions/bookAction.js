import Axios from 'axios';

export const GET_TITLES = 'GET_TITLES';
export const GET_BOOKS_AUTHOR_GENRE_TITLE = 'GET_BOOKS_AUTHOR_GENRE_TITLE';

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

const adminBooksSave=(data)=>{
    return{
        type:GET_BOOKS_AUTHOR_GENRE_TITLE,
        data
    }
}

export const getBooksByAuthor = (authorId,genreId,title) => {
    return (dispatch) => {
                Axios.post('books/adminsearch',{
                    authorId,
                    genreId,
                    title})
                .then(res => {
                    console.log(res.data);
                    if(res.data !== null){
                      return dispatch(adminBooksSave(res.data));
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                console.log(authorId,genreId,title);
            }
}

