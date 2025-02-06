import type { Request } from 'express';
import type IJwtPayload from './JwtPayloads';


export default interface IUserAuthRequest extends Request {
  user: IJwtPayload
}
