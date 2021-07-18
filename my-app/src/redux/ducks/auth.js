import * as api from '../../api/index'


// init state
const initailState = {
    authData: null
}


// action
/* ---------- google OAUTH ------------*/
const AUTH = 'AUTH'
export const auth = ()=>({
    type: AUTH
})
const LOGOUT = 'LOGOUT'
export const logout = ()=>({
    type: LOGOUT
})
/* ---------- google OAUTH ------------*/




/* ---------- My Auth ------------*/
export const signup = (userInfo, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(userInfo)
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: 'ERROR', payload: null})
        history.push('/posts')
    } catch (error) {
        const err = error.response.data.message
        dispatch({ type: 'ERROR', payload: err})
    }
}

export const signin = (userInfo, history) => async (dispatch) => {
    // const response = await api.signIn(userInfo)
    // const tmp = response.then(res => console.log(res)).catch((e)=>console.log(e))
    // console.log(response, response.data, tmp);
    try {
        const res = await api.signIn(userInfo)
        const { data } = res
        console.log(res);
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: 'ERROR', payload: null})
        history.push('/posts')
    } catch (error) {
        const err = error.response.data.message
        dispatch({ type: 'ERROR', payload: err})
    }

}

export const update = (userInfo, history) => async (dispatch) => {
    try {
        const { data } = await api.profileUpdate(userInfo)
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: 'ERROR', payload: null})
        history.push(`/user/${data._id}/profile`)
    } catch (error) {
        const err = error.response.data.message
        dispatch({ type: 'ERROR', payload: err})
    }
}



// reducer
const authReducer = (state = initailState, action) => {
    switch (action.type) {
        case AUTH:
            // set data into local storage and name it 'profile' 
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            // console.log(action?.payload, 'Set Profile');
            return { ...state, authData: action?.payload };
    
        case LOGOUT:
            // clean all user info in local storage
            localStorage.clear()
            return { ...state, authData: null };

        
        default:
            return state;
    }
    
}

export default authReducer