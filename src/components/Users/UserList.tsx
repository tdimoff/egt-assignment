import { List, Box, Paper, Typography, CircularProgress } from "@mui/material";
import UserItem from "./UserItem";
import { fetchUsers } from "../../store/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MessageAlert from "../MessageAlert";

function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector((state: RootState) => state.users);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ start: 0, limit: 10 }));
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {showAlert && (
        <MessageAlert
          type="success"
          message="User updated successfully"
          setShowAlert={setShowAlert}
        />
      )}
      <Box display="flex" justifyContent="center" width="100%" mt={4}>
        <Paper sx={{ maxWidth: 600, width: "100%", margin: "auto" }}>
          <List>
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onSuccess={() => setShowAlert(true)}
              />
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}

export default UserList;
