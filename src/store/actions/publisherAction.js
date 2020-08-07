import axios from 'axios';

export const GET_PUBLISHER = 'GET_PUBLISHER';

const storePublisher = (data) => {
    return {
        type:GET_PUBLISHER,
        data:data
    }
}

export const getPublisher = () => {
    return (dispatch) => {
        axios.get('publishers/read')
        .then(res => {
            console.log(res.data);
            dispatch(storePublisher(res.data))
        })
        .catch(err => {
            console.log(err);
        })
    }
}