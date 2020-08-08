import axios from 'axios';

export const GET_GENRE = 'GET_GENRE';

const storeGenre = (data) => {
    return {
        type:GET_GENRE,
        data:data
    }
}

export const getGenre = () => {
    return (dispatch) => {
        axios.get('genres/read')
        .then(res => {
            // console.log(res.data);
            dispatch(storeGenre(res.data))
        })
        .catch(err => {
            console.log(err);
        })
    }
}