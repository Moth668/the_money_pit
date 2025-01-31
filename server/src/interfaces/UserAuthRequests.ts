import type { Request } from 'express';
import type IJwtPayload from './JwtPayloads';  // import the interface from the file in the same directory
 

export default interface IUserAuthRequest extends Request { 
  user: IJwtPayload
}
