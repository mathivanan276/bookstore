import axios from 'axios';

export const GET_PUBLISHER = 'GET_PUBLISHER';
export const PUBLISHER_LOADING_TRUE = 'PUBLISHER_LOADING_TRUE';
export const PUBLISHER_LOADING_FALSE = 'PUBLISHER_LOADING_FALSE';

const storePublisher = (data) => {
    return {
        type:GET_PUBLISHER,
        data:data
    }
}

const publisherLoadingTrue = () => {
    return {
        type:PUBLISHER_LOADING_TRUE
    }
}

const publisherLoadingFalse = () => {
    return {
        type:PUBLISHER_LOADING_FALSE
    }
}

export const getPublisher = () => {
    return (dispatch) => {
        dispatch(publisherLoadingTrue());
        axios.get('publishers/read')
        .then(res => {
            if(res.data.response === true){
                dispatch(storePublisher(res.data))
                dispatch(publisherLoadingFalse())
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}