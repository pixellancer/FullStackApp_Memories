// init state
const initState = {
    error: ''
}


// action 
const ERROR = 'ERROR'
export const getError = () => {return {
    type: ERROR,
}}


// reducer
const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR:
            return {...state, error: action.payload}
    
        default:
            return state;
    }
}


export default errorReducer