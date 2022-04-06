import DateFnsUtils from '@date-io/date-fns';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { createStyles, makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import JaLocale from 'date-fns/locale/ja';
import React, { useState, useContext, createContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Layout from '../../components/templates/Layout';
import { TodoModel } from '../../services/payload/model/todo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column',
    },
    field: {
      margin: theme.spacing(1),
      width: 500,
    },
    button: {
      margin: theme.spacing(1),
      width: 300,
    },
    stepBtn: {
      margin: theme.spacing(1),
      width: 150,
    },
    table: {
      border: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: 4,
      width: 600,
    },
  })
);

// カテゴリー型定義
interface OptionItem {
  value: number;
  label: string;
}
// カテゴリー
const genreItems: Array<OptionItem> = [
  { value: 1, label: '家事' },
  { value: 2, label: 'ショッピング' },
  { value: 3, label: '勉強' },
  { value: 4, label: '仕事' },
  { value: 5, label: 'ゲーム' },
];
// リマインド設定
const reminderItems: Array<OptionItem> = [
  { value: 0, label: 'なし' },
  { value: 1, label: '5分前' },
  { value: 2, label: '1時間前' },
  { value: 3, label: '1日前' },
];

// 各ステップラベル
const getStep = () => {
  return ['必須項目', '任意項目', '内容確認'];
};

// 必須項目バリデーション
const reqItemSchema = yup.object({
  genre: yup.number().required('必須項目です'),
  title: yup.string().required('必須項目です').max(20, '20文字以内で入力してください'),
  deadlineDate: yup.date().required('必須項目です').min(new Date(), '過去日付は選択できません'),
  memo: yup.string().min(5, '5文字以上で入力してください'),
});

// 必須項目コンポーネント
const RequiredItems = (props: any) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TodoModel>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(reqItemSchema),
    defaultValues: {
      deadlineDate: new Date(),
    },
  });
  // useContextでTODOステートを受け取る
  const { todos, setTodos } = useContext(props.inputData);

  // 必須項目の値を分割代入してステートにセットして次のステップに進む
  const stepHandler: SubmitHandler<TodoModel> = (data) => {
    const { genre, title, deadlineDate } = data;
    const reqTodo = { genre: genre, title: title, deadlineDate: deadlineDate };
    setTodos({ ...reqTodo });
    props.handleNext();
    console.log(todos);
  };

  return (
    <form onSubmit={handleSubmit(stepHandler)}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        {/* プルダウン */}
        <Controller
          control={control}
          name="genre"
          render={({ field }) => (
            <TextField
              {...field}
              id="genre"
              label="カテゴリー"
              variant="outlined"
              className={classes.field}
              select
              error={Boolean(errors.genre)}
              helperText={errors.genre?.message}
            >
              {genreItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        {/* テキスト */}
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              {...field}
              id="title"
              label="タイトル"
              variant="outlined"
              className={classes.field}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          )}
        />
        {/* カレンダー */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={JaLocale}>
          <Controller
            control={control}
            name="deadlineDate"
            render={({ field }) => (
              <KeyboardDateTimePicker
                {...field}
                value={getValues().deadlineDate}
                onChange={(date: MaterialUiPickersDate) => setValue('deadlineDate', date)}
                id="deadlineDate"
                label="期日"
                format="yyyy/MM/dd hh:mm"
                className={classes.field}
                error={Boolean(errors.deadlineDate)}
                helperText={errors.deadlineDate?.message}
              />
            )}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid container justifyContent="flex-end">
        <ButtonGroup>
          <Button type="submit" variant="contained" color="primary" className={classes.stepBtn}>
            次へ
          </Button>
        </ButtonGroup>
      </Grid>
    </form>
  );
};

// 任意項目コンポーネント
const OptionalItems = (props: any) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<TodoModel>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      memo: '',
      reminderType: '0',
      // reminderDate: null,
      // repeatType: '',
      important: false,
    },
  });

  // useContextでTODOステートを受け取る
  const { todos, setTodos } = useContext(props.inputData);

  // 任意項目の値を追加でセットして次のステップに進む
  const stepHandler: SubmitHandler<TodoModel> = (data) => {
    const { genre, title, deadlineDate } = todos;
    let reminderDate: Date = new Date(deadlineDate);
    const { memo, reminderType, important } = data;
    // リマインド指定からリマインド日時を計算
    switch (reminderType) {
      case '0':
        reminderDate = new Date();
        break;
      case '1':
        reminderDate.setMinutes(deadlineDate.getMinutes() - 5);
        break;
      case '2':
        reminderDate.setHours(deadlineDate.getHours() - 1);
        break;
      case '3':
        reminderDate.setDate(deadlineDate.getDate() - 1);
        break;
      default:
        break;
    }
    const addOptTodo = {
      genre: genre,
      title: title,
      deadlineDate: deadlineDate,
      memo: memo,
      reminderType: reminderType,
      reminderDate: reminderDate,
      important: important,
    };

    setTodos({ ...addOptTodo });
    console.log(todos);
    props.handleNext();
  };

  return (
    <form onSubmit={handleSubmit(stepHandler)}>
      <Grid container justifyContent="center" alignItems="center">
        <Controller
          control={control}
          name="memo"
          rules={{ minLength: { value: 5, message: '5文字以上で入力してください' } }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="詳細"
              variant="outlined"
              className={classes.field}
              rows={5}
              fullWidth
              multiline
              error={Boolean(errors.memo)}
              helperText={errors.memo?.message}
            />
          )}
        />
        <Grid container justifyContent="center" alignItems="center">
          <Controller
            name="important"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox id="important" color="primary" {...field} />} label="重要" />
            )}
          />
        </Grid>
        <FormControl>
          <FormLabel>リマインド</FormLabel>
          <Controller
            control={control}
            name="reminderType"
            render={({ field }) => (
              <RadioGroup id="reminderType" row {...field}>
                {reminderItems.map((item) => (
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label={item.label}
                    value={item.value.toString()}
                    key={item.value}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      </Grid>
      <Grid container justifyContent="space-between">
        <Button color="inherit" variant="contained" className={classes.stepBtn} onClick={() => props.handleBack()}>
          戻る
        </Button>
        <Button type="submit" color="primary" variant="contained" className={classes.stepBtn}>
          次へ
        </Button>
      </Grid>
    </form>
  );
};

// 内容確認コンポーネント
const InputsConfirm = (props: any) => {
  const classes = useStyles();

  // useContextでTODOステートを受け取る
  const { todos } = useContext(props.inputData);
  const { title, genre, deadlineDate, memo, reminderType, reminderDate, important } = todos;

  const stepHandler = (step: any) => {
    if (step === 'back') {
      reminderDate == null;
      props.handleBack();
    } else if (step === 'reset') {
      props.handleReset();
    } else if (step === 'submit') {
      alert(JSON.stringify(todos));
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#dcdcdc' }}>
              <TableCell>
                <Box fontWeight="fontWeightBold">項目</Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold">内容</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>カテゴリー</TableCell>
              <TableCell>{genreItems[genre - 1].label}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>{title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>期日</TableCell>
              <TableCell>{format(deadlineDate, 'yyyy/MM/dd hh:mm')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>詳細</TableCell>
              <TableCell>{memo ? memo : '記入なし'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>リマインド</TableCell>
              {reminderType === '0' ? (
                <TableCell>リマインドなし</TableCell>
              ) : (
                <TableCell>
                  {reminderItems[parseInt(reminderType)].label}
                  <br />
                  {format(reminderDate, 'yyyy/MM/dd hh:mm')}
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>重要</TableCell>
              {important ? (
                <TableCell>
                  <DoneIcon />
                </TableCell>
              ) : (
                <TableCell>
                  <ClearIcon />
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup>
        <Button variant="contained" color="inherit" className={classes.stepBtn} onClick={() => stepHandler('back')}>
          戻る
        </Button>
        <Button
          size="large"
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => stepHandler('submit')}
        >
          追加
        </Button>
        <Button variant="contained" color="inherit" className={classes.stepBtn} onClick={() => stepHandler('reset')}>
          リセット
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

// 親コンポーネント
const AddTodo: React.FC = () => {
  const { reset } = useForm<TodoModel>({});
  // TODO変数状態管理
  const [todos, setTodos] = useState<Array<TodoModel>>([]);
  // createContextで子コンポーネントにTODOステートを受け渡す
  const todoValue = {
    todos,
    setTodos,
  };
  const UserInputData = createContext(todoValue);
  // ステップ変数状態管理
  const [stepIndex, setStepIndex] = useState(0);
  // 各ステップラベル取得
  const steps = getStep();

  // 次のステップに進める
  const nextStepHandler = () => {
    setStepIndex((prevStepIndex) => prevStepIndex + 1);
  };
  // 前のステップに戻る
  const backStepHandler = () => {
    setStepIndex((prevStepIndex) => prevStepIndex - 1);
  };
  // ステップをリセット
  const resetStepHandler = () => {
    reset;
    setStepIndex(0);
  };

  // インデックスによって描画するコンポーネントを振り分け
  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <RequiredItems handleNext={nextStepHandler} inputData={UserInputData} />;
      case 1:
        return <OptionalItems handleNext={nextStepHandler} handleBack={backStepHandler} inputData={UserInputData} />;
      case 2:
        return <InputsConfirm handleBack={backStepHandler} handleReset={resetStepHandler} inputData={UserInputData} />;
      default:
        return [];
    }
  };
  return (
    <Layout title="TODO追加">
      <Grid component={Paper}>
        {/* ステッパー */}
        <Stepper style={{ borderRadius: 4 }} activeStep={stepIndex} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* ステップ変数を渡して各コンポーネントを描画 */}
        <UserInputData.Provider value={todoValue}>{getStepContent(stepIndex)}</UserInputData.Provider>
      </Grid>
    </Layout>
  );
};

export default AddTodo;
