// initState
const initState = {
    loading: true
}

// action
export const START_LOADING = 'START_LOADING'

export const END_LOADING = 'END_LOADING'


// reducer
const loadingReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true }
        
        case END_LOADING:
            return { ...state, loading: false}
    
        default:
            return state
    }
}

export default loadingReducer