import axios, { AxiosError } from 'axios';
import { ValidationError } from '../models/validationError';

export const isValidationError = (payload: any): payload is AxiosError<ValidationError> => {
  if (!axios.isAxiosError(payload)) return false;
  if (!payload.response) return false;
  return payload.response.data && payload.response.data.validationMessages !== undefined;
};
