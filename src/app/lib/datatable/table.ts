export interface IModel {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errorMessage: string;
  result: result;
}
export interface result {
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  //list:@Model;
}

export interface edadModel {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errorMessage: string;
  result: number;
}
