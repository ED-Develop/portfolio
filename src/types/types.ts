import {UploadStatus} from '../redux/timeline/timeline-reducer';
import {ReactElement} from 'react';

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type TUserModel = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
    followed: boolean
}

export type PhotosType = {
    small: string | null
    large: string | null
}


export type TProfileModel = {
    userId: string | number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: TContacts
    photos: PhotosType
};

export type TContacts = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type TPostModel = {
    postId: string,
    date: string | number,
    user: PostUserType
    content: TPostContent
    statistic: TPostStatistic
    isDisabledComments: boolean
    comments: Array<TPostComment>
}

export type PostUserType = {
    fullName: string | null
    id: number | null
    photos: PhotosType
}

export type TPostContent = {
    text: string
    photos: Array<string>
    video?: string
}

export type TPostStatistic = {
    liked: Array<number>
    comments: number
    shared: number
    saved: number
}

export type TPostComment = {
    id: string
    user: PostUserType
    content: string
    date: string
}

export type TPostFormData = {
    text: string
    photos: Array<string>
}

export type TProjectModel = {
    id: string
    title: string
    stack: Array<string>
    logo: string
    link: string
    description: string
}

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TUploadedFile = {
    status: UploadStatus
    fileName: string
    fileUrl: string
}

export type TObject = { [key: string]: any };

export type TLink = {
    title: string
    href: string
    icon?: string | ReactElement
}

export enum ProcessStatusEnum {
    Pending = 'loading',
    Success = 'success',
    Error = 'error'
}

export type TId = string | number
