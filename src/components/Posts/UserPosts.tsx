import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchPosts, deletePostThunk, updatePostThunk } from '../../store/postSlice';
import { fetchUserDetails } from '../../store/userSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  TextField,
  Box,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper
} from '@mui/material';
import { IPost } from '../../types/IPost.interface';
import { IUser } from '../../types/IUser.interface';
import UserEditForm from '../Users/UserEditForm';
import { useForm } from 'react-hook-form';

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);
  const [postEdited, setPostEdited] = useState<IPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts(userId));
      dispatch(fetchUserDetails(userId));
    }
  }, [userId, dispatch]);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    mode: 'all',
    defaultValues: {
      userId,
      title: postEdited?.title,
      body: postEdited?.body
    }
  });
  
  useEffect(() => {
    if (postEdited) {
      reset({
        userId,
        title: postEdited.title,
        body: postEdited.body
      });
    }    
  }, [postEdited, reset, userId])

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(updatePostThunk({...postEdited, ...data}));
    setPostEdited(null);
  }

  const handleEdit = (post: IPost) => {
    setPostEdited(post);
  };

  const handleDelete = (postId: string) => {
    setDeleteConfirm(postId);
  };

  {/* TODO: Complete deletion */}
  const confirmDelete = () => {
    if (deleteConfirm) {
      console.log(deleteConfirm)
      // dispatch(deletePostThunk(deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        {isEditingUser ? (
          <UserEditForm
            user={selectedUser as IUser}
            onCancel={() => setIsEditingUser(false)}
            onSuccess={() => setIsEditingUser(false)}
          />
        ) : (
          <Box>
            <Typography variant="h5">{selectedUser?.name}</Typography>
            <Typography variant="body1">{selectedUser?.email}</Typography>
            <Button variant="outlined" onClick={() => setIsEditingUser(true)}>Edit</Button>
          </Box>
        )}
      </Paper>
      {posts.map(post => (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }} key={post.id}>
          {postEdited?.id === post.id ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Box>
              <TextField
                fullWidth
                label="Body"
                variant="outlined"
                {...register('body')}
                error={!!errors.body}
                helperText={errors.body?.message}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setPostEdited(null)}>Cancel</Button>
                <Button type="submit" disabled={!isDirty}>Save</Button>
              </Box>
            </form>
          ) : (
            <Box>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.body}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleEdit(post)}>Edit</Button>
              <Box ml={2} display='inline'>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(post.id as any)}
                >
                    Delete
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      ))}
      <Dialog
        open={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserPosts;
