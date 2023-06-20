export interface IRequest extends Request {
  headers: Request['headers'] & {
    authorization?: string;
  };
}
