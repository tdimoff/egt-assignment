import axios from 'axios';

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

export const updateUser = (user: User) => {
  return api.put(`/users/${user.id}`, user); 
}

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
} 

export const getTasks = () => {
  return api.get('/todos');
}

// User model
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string 
    city: string
  }
}
