import * as actionType from '../actions/bookAction'; 

const initialState = {
    bookstitle: [{
        id:1
    }],
    book: {title:"getting"}
}

const reducer = (state = initialState , action) => {

    switch(action.type){

        case (actionType.GET_BOOKS_AUTHOR_GENRE_TITLE) : 
            return {
                ...state,
                bookstitle:action.data
            };
        case (actionType.GET_BOOK) : 
        return {
            ...state,
            book:action.data
        };
        // case (actionType.GET_TITLES):
        //     return{
        //         ...state,
        //         bookstitle: action.data
        //     };

        default: 
            return state;
    }
}

export default reducer;