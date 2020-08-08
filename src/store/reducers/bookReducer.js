import * as actionType from '../actions/bookAction'; 

const initialState = {
    bookstitle: [{
        id:1
    }],
    books : {}
}

const reducer = (state = initialState , action) => {

    switch(action.type){

        case (actionType.GET_BOOKS_AUTHOR_GENRE_TITLE) : 
            console.log('mathi')
            return {
                ...state,
                books:action.data
            };
        case (actionType.GET_TITLES):
            return{
                ...state,
                bookstitle: action.data
            };

        default: 
            return state;
    }
}

export default reducer;