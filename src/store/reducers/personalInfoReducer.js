import * as personalInfoActionTypes from '../actions/personalInfoAction';
const initialState = {
    personalInfo : {},
    personalInfoLoading: true
}

const reducer = ( state=initialState , action) => {
    switch(action.type){
        case (personalInfoActionTypes.GET_PERSONAL_INFO) : 
            return({
                ...state,
                personalInfo: action.data
            })
        case (personalInfoActionTypes.PERSONAL_INFO_LOADING_TRUE) :
            return({
                ...state,
                personalInfoLoading:true
            })
        case (personalInfoActionTypes.PERSONAL_INFO_LOADING_FALSE) :
            return({
                ...state,
                personalInfoLoading:false
            })

        default :
            return state;
    }
}
export default reducer;