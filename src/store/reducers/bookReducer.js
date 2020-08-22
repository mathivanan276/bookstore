import * as actionType from '../actions/bookAction'; 

const initialState = {
    bookstitle: [],
    bookstitleLoading : true,
    bookLoading: true,
    book: {},
    searchedBooksLoading: true,
    searchedBooks: [],
    lowStock: 'loading'
}

const reducer = (state = initialState , action) => {

    switch(action.type){

        // case (actionType.GET_BOOKS_AUTHOR_GENRE_TITLE) : 
        //     return {
        //         ...state,
        //         bookstitle:action.data
        //     };
        // case (actionType.TITLE_LOADING_TRUE) : 
        // return {
        //     ...state,
        //     bookstitleLoading:true
        // };
        // case (actionType.TITLE_LOADING_FALSE) : 
        // return {
        //     ...state,   
        //     bookstitleLoading:false
        // };
        case (actionType.BOOK_LOADING_TRUE) : 
        return {
            ...state,   
            bookLoading:true
        };
        case (actionType.BOOK_LOADING_FALSE) : 
        return {
            ...state,   
            bookLoading:false
        };
        case (actionType.GET_BOOK) : 
        return {
            ...state,
            book:action.data
        };
        case (actionType.GET_LOW_STOCK) : 
            return{
                ...state,
                lowStock:action.data
            }

        case (actionType.GET_SEARCHED_BOOK) :
            return{
                ...state,
                searchedBooks:action.data
            }
        case (actionType.SEARCHED_BOOK_LOADING_TRUE) :
            return{
                ...state,
                searchedBooksLoading:true
            }
        case (actionType.SEARCHED_BOOK_LOADING_FALSE) :
            return{
                ...state,
                searchedBooksLoading:false
            }
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