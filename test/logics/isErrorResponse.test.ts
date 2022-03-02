import { isErrorResponse } from '../../logics/isErrorResponse';

describe('isErrorResponse', () => {
  it('true', () => {
    const response = { error: 'error' };
    const expected = true;
    expect(isErrorResponse(response)).toEqual(expected);
  });
});

export {};
