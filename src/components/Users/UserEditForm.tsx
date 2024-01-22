import { TextField, Button, Box, Link, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IUser } from "../../types/IUser.interface";
import { updateUserThunk } from "../../store/userSlice";
import { AppDispatch } from "../../store";
import { validationSchema } from "../../schemas/user.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUserEditFormProps {
  user: IUser;
  onCancel: () => void;
  onSuccess: () => void;
  editMode?: "full" | "partial";
}

interface IFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

function UserEditForm({
  user,
  onCancel,
  onSuccess,
  editMode = "full",
}: IUserEditFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IFormValues>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        street: user.address.street,
        city: user.address.city,
        suite: user.address.suite,
      },
      company: {
        name: user.company.name,
      },
    } as IFormValues,
  });

  function onSubmit(data: IFormValues) {
    dispatch(updateUserThunk({ id: user.id, ...data })).then(onSuccess);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : " "}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : " "}
            />
          </Grid>
          {editMode === "full" && (
            <>
              <Grid item xs={6}>
                <TextField
                  {...register("phone")}
                  label="Phone"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : " "}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("website")}
                  label="Website"
                  fullWidth
                  error={!!errors.website}
                  helperText={errors.website ? errors.website.message : " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("company.name")}
                  label="Company"
                  fullWidth
                  error={!!errors.company?.name}
                  helperText={
                    errors.company?.name ? errors.company.name.message : " "
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("address.street")}
                  label="Street"
                  fullWidth
                  error={!!errors.address?.street}
                  helperText={
                    errors.address?.street ? errors.address.street.message : " "
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("address.suite")}
                  label="Suite"
                  fullWidth
                  error={!!errors.address?.suite}
                  helperText={
                    errors.address?.suite ? errors.address.suite.message : " "
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("address.city")}
                  label="City"
                  fullWidth
                  error={!!errors.address?.city}
                  helperText={
                    errors.address?.city ? errors.address.city.message : " "
                  }
                />
              </Grid>
            </>
          )}
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  reset();
                  onCancel();
                }}
              >
                Cancel
              </Button>
              <Box ml={2} display="inline">
                <Button type="submit" disabled={!isDirty} variant="outlined">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {editMode === "full" && (
          <Box mt={2}>
            <Button
              variant="contained"
              component={Link}
              href={`/users/${user.id}/posts`}
            >
              View Posts
            </Button>
          </Box>
        )}
      </form>
    </>
  );
}

export default UserEditForm;
