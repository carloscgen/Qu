interface IErrorMessageResponse {
    message: string;
  }
  
  export interface IErrorApiResponse {
    data: IErrorMessageResponse;
    status: number;
    statusText: string;
  }
  
  export interface IErrorResponse {
    response: IErrorApiResponse;
  }