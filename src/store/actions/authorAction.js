import axios from 'axios';

export const GET_AUTHORS = 'GET_AUTHORS';

const storeAuthors = (data) => {
    return {
        type:GET_AUTHORS,
        data:data
    }
}

export const getAuthors = () => {
    return (dispatch) => {
        axios.get('authors/read')
        .then(res => {
            // console.log(res.data);
            dispatch(storeAuthors(res.data))
        })
        .catch(err => {
            console.log(err);
        })
    }
}