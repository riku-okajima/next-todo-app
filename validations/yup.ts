import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: '無効です',
    required: '必須です',
    oneOf: '次の値のいずれかでなければなりません:${values}',
    notOneOf: '次の値のいずれかであってはなりません:${values}',
  },
  string: {
    length: '${length}文字で入力してください',
    min: '${min}文字以上で入力してください',
    max: '${max}文字以下で入力してください',
    matches: '次と一致する必要があります: "${regex}"',
    email: 'メールアドレス形式で入力してください',
    url: 'URL形式で入力してください',
    trim: '半角スペースをでなければなりません',
    lowercase: '小文字で入力してください',
    uppercase: '大文字で入力してください',
  },
  number: {
    min: '${min}以上の値を入力して下さい',
    max: '${max}以下の値を入力して下さい',
    lessThan: '${less}より小さい値を入力して下さい',
    moreThan: '${more}より大きい値を入力して下さい',
    positive: '正の数を入力して下さい',
    negative: '負の数を入力して下さい',
    integer: '整数を入力して下さい',
  },
  date: {
    min: '${min}以上の日付を入力して下さい',
    max: '${max}以下の日付を入力して下さい',
  },
  object: {
    noUnknown: '有効なキーを持ったデータを入力して下さい',
  },
  array: {
    min: '${min}要素数以上の値を入力して下さい',
    max: '${max}要素数以下の値を入力して下さい',
  },
});

yup.addMethod(yup.string, 'katakana', function () {
  return this.test('katakana', '全角カタカナで入力してください', function (value) {
    if (!value) return true;
    return !!value.match(/^[ァ-ヶー]*$/);
  });
});

export default yup;
