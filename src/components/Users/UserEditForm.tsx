import { TextField, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { IUser } from "../../types/IUser";
import { updateUserThunk } from "../../store/userSlice";
import { AppDispatch } from "../../store";
import { validationSchema } from '../../schemas/user.schema';
import { yupResolver } from '@hookform/resolvers/yup';

interface IUserEditFormProps {
    user: IUser;
    onCancel: () => void
}

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    website: string; 
    address: {
      street: string;
      city: string;
    },
    company: {
      name: string
    }
  }

function UserEditForm({ user, onCancel }: IUserEditFormProps) {
    const dispatch = useDispatch<AppDispatch>();
  
    const { register, handleSubmit } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: {
          street: user.address.street,
          city: user.address.city,
        },
        company: {
          name: user.company.name
        }
      } as IFormValues
    });
  
    function onSubmit(data: IUser) {
      dispatch(updateUserThunk(data));
    }
  
    return (
      <form onSubmit={handleSubmit(() => onSubmit)}>
        <TextField
          {...register('name')} 
          label="Name" 
        />
  
        <TextField
          {...register('email')}
          label="Email"
        />
  
        <TextField 
          {...register('phone')}
          label="Phone"  
        />
  
        <TextField
          {...register('website')} 
          label="Website"
        />
  
        <TextField
          {...register('address.street')}
          label="Street Address"
        />
  
        <TextField
          {...register('address.city')} 
          label="City"
        />
        
        <TextField
          {...register('company.name')}
          label="Company" 
        />
  
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
    );
}

export default UserEditForm;
