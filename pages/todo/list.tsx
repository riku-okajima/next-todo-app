import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import { unwrapResult } from '@reduxjs/toolkit';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from '../../components/templates/Layout';
import { search } from '../../redux/modules/todo';
import { AppDispatch, useSelector } from '../../redux/store';
import { TodoModel } from '../../services/payload/model/todo';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));

const TodoList = (): JSX.Element => {
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

  const handleDetailClick = (id: number) => {
    Router.push(`/todo/${id}`);
  };

  return (
    <Layout title="TodoList">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.root}>
              <TableCell className={classes.head}>タイトル</TableCell>
              <TableCell className={classes.head}>詳細</TableCell>
              <TableCell className={classes.head}>リマインド日</TableCell>
              <TableCell className={classes.head}>期限日</TableCell>
              <TableCell className={classes.head}>繰り返し</TableCell>
              <TableCell className={classes.head}>ジャンル</TableCell>
              <TableCell className={classes.head}>重要</TableCell>
              <TableCell className={classes.head}>詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((row) => (
              <TableRow key={row.id} className={classes.root}>
                <TableCell className={classes.body}>{row.title}</TableCell>
                <TableCell className={classes.body}>{row.memo}</TableCell>
                <TableCell className={classes.body}>{row.reminderDate}</TableCell>
                <TableCell className={classes.body}>{row.deadlineDate}</TableCell>
                <TableCell className={classes.body}>{row.repeatType}</TableCell>
                <TableCell className={classes.body}>{row.genre}</TableCell>
                <TableCell className={classes.body}>{row.important}</TableCell>
                <TableCell className={classes.body}>
                  <IconButton aria-label="detail" onClick={() => handleDetailClick(row.id)}>
                    <DetailsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default TodoList;
