import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import { search } from '../../redux/modules/todo';
import { AppDispatch, useSelector } from '../../redux/store';
import { TodoModel } from '../../services/payload/model/todo';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const Dashboard = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const authToken = useSelector((state) => state.auth.authToken);
  const [todoList, setTodoList] = useState<Array<TodoModel>>([]);

  useEffect(() => {
    const fetchTodo = async () => {
      const promise = await dispatch(search());
      const response = unwrapResult(promise); // unwrapResultでcreateAsyncThunkの戻り値を取得(reduxではなくstateを使いたいため)
      setTodoList(response.todoList);
    };
    authToken && fetchTodo(); // ログイン直後はreduxに反映されていないのでuseSelectorでauthTokenが取得出来たことを確認してから実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <Layout title="Dashboard">
      <Grid container className={classes.root} spacing={3}>
        {todoList.map(({ id, title, memo }) => (
          <Grid key={id} item xs={3}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {id}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader="September 14, 2016"
              />
              <CardMedia className={classes.media} image="/images/paella.jpg" title="Paella dish" />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {memo}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
