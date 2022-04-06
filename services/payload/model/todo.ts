export interface TodoModel {
  id: number;
  title: string;
  memo: string;
  reminderType: string;
  reminderDate: Date | null;
  deadlineDate: Date | null;
  repeatType: string;
  genre: number;
  important: boolean;
}
