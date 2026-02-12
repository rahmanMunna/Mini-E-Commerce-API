/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { Request } from "express";
import { IPayload } from 'src/interfaces/payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const x_user_id = request.headers['x-user-id'];

    if (!authHeader) {
      throw new UnauthorizedException('Token in header is missing');
    }

    // Check if x-user-id header exists
    if (!x_user_id) {
      throw new UnauthorizedException('x-user-id header is missing');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try{
        const payload : IPayload = await this.jwtService.verifyAsync(token);
        if(!payload) {
             throw new UnauthorizedException('Invalid token');
        }
        if(payload.sub.toString() !== x_user_id.toString()) {
            throw new UnauthorizedException('User ID does not match token');
        }
        return true;
    } 
    catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new UnauthorizedException('Token has expired');
        }
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedException('Invalid token');
        }
        if (error instanceof NotBeforeError) {
          throw new UnauthorizedException('Token not active yet');
        }
        throw new UnauthorizedException('Authentication failed');
    }

    
  }
}