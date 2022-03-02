export interface TodoSearchRequest {
  id?: number;
  title?: string;
  memo?: string;
  reminderDate?: Date;
  deadlineDate?: Date;
  repeatType?: string;
  genre?: number;
  important?: boolean;
}

export interface TodoRegisterRequest {
  title: string;
  memo?: string;
  reminderDate?: Date;
  deadlineDate?: Date;
  repeatType?: string;
  genre?: number;
  important?: boolean;
}

export type TodoUpdateRequest = TodoRegisterRequest;
