import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from '../../components/templates/Layout';
import { detail } from '../../redux/modules/todo';
import { AppDispatch, useSelector } from '../../redux/store';
import { TodoModel } from '../../services/payload/model/todo';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    zIndex: 1,
    width: 350,
    top: -60,
    paddingTop: 60,
    paddingBottom: 40,
  },
  cardFooter: {
    justifyContent: 'center',
    paddingTop: 30,
  },
}));
const TodoDetail = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const todoId = Number(id);
  const authToken = useSelector((state) => state.auth.authToken);
  const [todo, setTodo] = useState<TodoModel>();
  useEffect(() => {
    const fetchTodo = async () => {
      const promise = await dispatch(detail(todoId));
      const response = unwrapResult(promise); // unwrapResultでcreateAsyncThunkの戻り値を取得(reduxではなくstateを使いたいため)
      setTodo(response);
    };
    authToken && fetchTodo(); // ログイン直後はreduxに反映されていないのでuseSelectorでauthTokenが取得出来たことを確認してから実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);
  const handleUpdate = () => {
    router.push('todo/');
  };
  return (
    <Layout title="TodoDetail">
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography>{todo?.title}</Typography>
            </CardContent>
            <CardActions className={classes.cardFooter}>
              <Button variant="contained" color="primary" size="large" onClick={handleUpdate}>
                更新
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default TodoDetail;
