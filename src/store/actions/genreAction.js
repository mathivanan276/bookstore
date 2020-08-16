import axios from 'axios';

export const GET_GENRE = 'GET_GENRE';
export const GENRE_LODING_TRUE = 'GENRE_LODING_TRUE';
export const GENRE_LODING_FALSE = 'GENRE_LODING_FALSE';

const genreLoadingTrue = () => {
    return {
        type:GENRE_LODING_TRUE
    }
}

const genreLoadingFalse = () => {
    return {
        type:GENRE_LODING_FALSE
    }
}

const storeGenre = (data) => {
    return {
        type:GET_GENRE,
        data:data
    }
}

export const getGenre = () => {
    return (dispatch) => {
        dispatch(genreLoadingTrue());
        axios.get('genres/read')
        .then(res => {
            // console.log(res.data);
            if(res.data.response === true){
                dispatch(storeGenre(res.data));
                dispatch(genreLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}