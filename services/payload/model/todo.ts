export interface TodoModel {
  id: number;
  title: string;
  memo: string;
  reminderDate: Date;
  deadlineDate: Date;
  repeatType: string;
  genre: number;
  important: boolean;
}
