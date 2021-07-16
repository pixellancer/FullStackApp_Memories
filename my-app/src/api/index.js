import axios from 'axios'

// const url = 'http://localhost:4000/posts'

const API = axios.create({ baseURL: "http://localhost:4000/" })


// it takes function and apply on each request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const fetchPosts = () => API.get('/posts')
export const fetchPostDetail = (id) => API.get(`/posts/${id}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`)
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`)


export const signIn = (userInfo) => API.post('/user/signin', userInfo)
export const signUp = (userInfo) => API.post('/user/signup', userInfo)