import { yupResolver } from '@hookform/resolvers/yup/dist/yup'; // Next12によって発生したエラーの一時的な回避(https://github.com/react-hook-form/resolvers/issues/271)
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import Router from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ErrorMessage from '../../components/atoms/label/ErrorMessage';
import { TOAST_MESSAGE } from '../../constants/toastMessage';
import { isErrorResponse } from '../../logics/isErrorResponse';
import { setToastMessage } from '../../redux/modules/app';
import { login } from '../../redux/modules/auth';
import { AppDispatch, useSelector } from '../../redux/store';
import yup from '../../validations/yup';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    zIndex: 1,
    width: 350,
    top: -60,
    paddingTop: 60,
    paddingBottom: 40,
  },
  cardHeader: {
    position: 'relative',
    zIndex: 2,
    margin: '100px 20px 0px 20px',
    padding: '40px 0',
    borderRadius: 3,
    background: `linear-gradient(60deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
    boxShadow: `5px 5px 5px rgba(95,95,95,0.4)`,
    color: '#fff',
    fontWeight: 100,
    textAlign: 'center',
  },
  title: {
    marginTop: '30px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#5F5F5F',
  },
  divider: {
    marginTop: '30px',
  },
  cardFooter: {
    justifyContent: 'center',
    paddingTop: 30,
  },
  inputIconsColor: {
    color: '#495057',
  },
}));

export interface LoginForm {
  mailAddress: string;
  password: string;
}

const Login = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [isShowPassword, setShowPassword] = useState(false);
  const validationMessages = useSelector((state) => state.app.validationMessages);

  const schema = yup.object().shape({
    mailAddress: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { mailAddress: '', password: '' },
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit = async (data: LoginForm) => {
    const { mailAddress, password } = data;
    const response = await dispatch(login({ mailAddress, password }));
    if (isErrorResponse(response)) return;
    dispatch(setToastMessage(TOAST_MESSAGE.LOGIN_SUCCESSFUL));
    Router.push('/dashboard');
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <div className={classes.cardHeader}>
          <span>RPC ナレッジ</span>
        </div>
        <Card className={classes.card}>
          <p className={classes.title}>Welcome to RPC Knowledge!</p>
          <CardContent>
            <ErrorMessage>{validationMessages && validationMessages.map((value) => value)}</ErrorMessage>
            <Controller
              name="mailAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email..."
                  fullWidth={true}
                  endAdornment={
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  }
                />
              )}
            />
            <ErrorMessage>{errors.mailAddress?.message}</ErrorMessage>
            <p className={classes.divider}></p>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Password..."
                  fullWidth={true}
                  type={isShowPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {isShowPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <Button variant="contained" color="primary" size="large" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
