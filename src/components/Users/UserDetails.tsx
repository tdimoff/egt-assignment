import {
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserEditForm from './UserEditForm';
import { IUser } from '../../types/IUser';

interface IUserDetailProps {
  user: IUser;
}

function UserDetails({ user }: IUserDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit
  } = useForm({ 
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      streetAddress: user.address,
      company: user.company
    }
  });

  // function onSubmit(data) {
  //   // save user data
  // }

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          onCancel={()=>{}}
        />
      ) : (
        <List>
         <ListItem>
            <ListItemText primary='Name' secondary={user.name} />
          </ListItem>
        </List>
      )}

      <Button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}  
      </Button>
    </>
  );
}

export default UserDetails;
