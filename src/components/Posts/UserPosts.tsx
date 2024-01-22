import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchPosts,
  deletePostThunk,
  updatePostThunk,
} from "../../store/postSlice";
import { fetchUserDetails } from "../../store/userSlice";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import { IPost } from "../../types/IPost.interface";
import { IUser } from "../../types/IUser.interface";
import UserEditForm from "../Users/UserEditForm";
import { useForm } from "react-hook-form";
import ConfirmDialog from "../ConfirmDialog";
import MessageAlert from "../MessageAlert";

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);
  const [postEdited, setPostEdited] = useState<IPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (typeof userId) {
      dispatch(fetchPosts(userId as string));
      dispatch(fetchUserDetails(userId as string));
    }
  }, [userId, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      userId,
      title: postEdited?.title,
      body: postEdited?.body,
    }
  });

  useEffect(() => {
    if (postEdited) {
      reset({
        userId,
        title: postEdited.title,
        body: postEdited.body,
      });
    }
  }, [postEdited, reset, userId]);

  const onSubmit = (data: IPost) => {
    dispatch(updatePostThunk({ ...postEdited, ...data }));
    setPostEdited(null);
    setAlertMessage("Post updated successfully");
    setShowAlert(true);
  };

  const handleEdit = (post: IPost) => {
    setPostEdited(post);
  };

  const handleDelete = (postId: string) => {
    setDeleteConfirm(postId);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      dispatch(deletePostThunk(Number(deleteConfirm)));
      setDeleteConfirm(null);
      setAlertMessage("Post deleted successfully");
      setShowAlert(true);
    }
  };

  return (
    <Container>
      {showAlert && (
        <MessageAlert
          type="success"
          message={alertMessage}
          setShowAlert={setShowAlert}
        />
      )}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        {isEditingUser ? (
          <UserEditForm
            user={selectedUser as IUser}
            onCancel={() => setIsEditingUser(false)}
            onSuccess={() => setIsEditingUser(false)}
            editMode="partial"
          />
        ) : (
          <Box>
            <Typography variant="h5">{selectedUser?.name}</Typography>
            <Typography variant="body1">{selectedUser?.email}</Typography>
            <Box mt={2}>
              <Button variant="outlined" onClick={() => setIsEditingUser(true)}>
                Edit
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      {posts.map((post) => (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }} key={post.id}>
          {postEdited?.id === post.id ? (
            <form onSubmit={handleSubmit(onSubmit as any)}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Box>
              <TextField
                fullWidth
                label="Body"
                variant="outlined"
                multiline
                rows={4}
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPostEdited(null)}
                >
                  Cancel
                </Button>
                <Box ml={2}>
                  <Button variant="outlined" type="submit" disabled={!isDirty}>
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          ) : (
            <Box>
              <Box mb={2}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.body}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(post)}
              >
                Edit
              </Button>
              <Box ml={2} display="inline">
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
      <ConfirmDialog
        open={!!deleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default UserPosts;
