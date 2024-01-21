import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import UserEditForm from './UserEditForm';
import { IUser } from '../../types/IUser.interface';

interface IUserItemProps {
  user: IUser;
  onSuccess: () => void;
}

function UserItem({ user, onSuccess }: IUserItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={user.name} />
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItem>
            <UserEditForm
              onSuccess={onSuccess}
              user={user}
              onCancel={() => setOpen(false)}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default UserItem;
