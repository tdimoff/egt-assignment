import axios from 'axios';
import { IPost } from '../types/IPost.interface';
import { IUser } from '../types/IUser.interface';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getUsers = () => api.get('/users'); 

export const getUserById = (id: number) => api.get(`/users/${id}`);

export const getPostsForUser = (userId: number) => {
  return api.get('/posts', { 
    params: {
      userId
    }
  });
}

export const updateUser = (user: IUser) => {
  return api.put(`/users/${user.id}`, user); 
}

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
}

export const updatePost = (post: IPost) => {
  return api.put(`/posts/${post.id}`, post);
}

export const getTasks = (start: number, limit: number) => {
  return api.get('/todos', {
    params: {
      _start: start,
      _limit: limit
    }
  }).then(response => ({
    tasks: response.data,
    totalCount: parseInt(response.headers['x-total-count'], 10)
  }));
};

export const getPosts = (id: string) => {
  return api.get(`posts?userId=${id}`)
}
