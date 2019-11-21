export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface FbAuthResponce{
    idToken: string,
    expiresIn: string
}

export interface Post {
    id?: string
    author: string
    text: string
    title: string
    date: Date
}