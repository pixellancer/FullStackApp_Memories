import * as api from '../../api/index'

// init state
const initailState = {
    posts: []
}


// actions creators
const FETCH = 'FETCH_ALL'
// async function, from redux thunk
export const getPosts = () => async (dispatch) => {
    try {
        const { data }  = await api.fetchPosts()
        console.log('GET data', data);
        dispatch({ type: FETCH, payload: data })
    } catch (error) {
        console.log(error.response.data);
    }
}


const FETCH_ONE = 'FETCH_ONE'
export const getPostDetail =  (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })

        const { data } = await api.fetchPostDetail(id)
        console.log('GET post detail', data);
        dispatch({ type: FETCH_ONE, payload: data })
        
        dispatch({ type: 'END_LOADING' })
    } catch (error) {
        console.log(error.response.data);
    }
}


const CREATE = 'CREATE'

export const createPosts = (post) => async (dispatch) =>  {
    try {
        const { data } = await api.createPost(post)
        console.log('POST data', data);
        dispatch({ type: CREATE, payload: data})
    } catch (error) {
        console.log(error.response.data);
        
    }
}

const UPDATE = 'UPDATE'

export const updatePost = (id, post) => async (dispatch) =>  {
    try {
        const { data } = await api.updatePost(id, post)
        console.log('UPDATE data', data);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.response.data);
    }
}

const DELETE = 'DELETE'

export const deletePost = (id) => async (dispatch) =>  {
    try {
        await api.deletePost(id)
        console.log('DELETE data', id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error.response.data);
    }
}

const LIKE = 'LIKE'

export const likePost = (id) => async (dispatch) =>  {
    try {
        const { data } = await api.likePost(id)
        console.log('LIKE data', data);
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error.response.data);
    }
}



// reducer

const postsReducer = (state = initailState, action) => {
    switch(action.type){
        case FETCH:
            return  {  ...state, posts: action.payload }
        case FETCH_ONE:
            console.log('FETCH_ONE');
            return  {  ...state, post: action.payload }
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload]}
        case UPDATE:
            const newPosts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            return {  ...state, posts: newPosts }
        case DELETE:
            const remaindPost = state.posts.filter((post) => post._id !== action.payload)
            return {  ...state, posts: remaindPost }
        case LIKE:
            const likePost = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            return {  ...state, posts: likePost }
        default:
            return state
    }
    
}

export default postsReducer