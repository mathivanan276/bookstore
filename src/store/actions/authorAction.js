import axios from 'axios';

export const GET_AUTHORS = 'GET_AUTHORS';
export const AUTHOR_LODING_TRUE = 'AUTHOR_LODING_TRUE';
export const AUTHOR_LODING_FALSE = 'AUTHOR_LODING_FALSE';

const storeAuthors = (data) => {
    // console.log(data);
    return {
        type:GET_AUTHORS,
        data:data
    }
}

const authorLoadingTrue = () => {
    return {
        type:AUTHOR_LODING_TRUE
    }
}

const authorLoadingFalse = () => {
    return {
        type:AUTHOR_LODING_FALSE
    }
}

export const getAuthors = () => {
    return (dispatch) => {
        dispatch(authorLoadingTrue());
        axios.get('authors/read')
        .then(res => {
            // console.log(res.data);
            if(res.data.response === true){
                dispatch(storeAuthors(res.data));
                dispatch(authorLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}