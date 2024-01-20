import { List } from '@mui/material';
import UserItem from './UserItem';
import { fetchUsers } from '../../store/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector((state: RootState) => state.users);  

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) { 
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error!</div> 
  }

  return (
    <List>
      {users.slice(0, 10).map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  )
}

export default UserList;
