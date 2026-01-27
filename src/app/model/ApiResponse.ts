export interface ApiResponse<T> {
  statusCode: boolean;
  message: string;
  data: T;
}
