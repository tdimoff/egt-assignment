import { ListItemButton, ListItemText, Collapse } from "@mui/material";
import UserDetails from './UserDetails';
import { useState } from 'react';
import { IUser } from "../../types/IUser";

interface IUserItemProps {
  user: IUser
}

function UserItem({ user }: IUserItemProps) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemText primary={user.name} />  
        </ListItemButton>
        <Collapse in={open}>
          <UserDetails user={user} />
        </Collapse>
      </>
    )
}

export default UserItem;
