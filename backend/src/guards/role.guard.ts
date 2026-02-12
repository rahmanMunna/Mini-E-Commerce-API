/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { IPayload } from 'src/interfaces/payload.interface';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request : Request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
        throw new UnauthorizedException('Token in header is missing');
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

        if(!roles.includes(payload.role)) {
            throw new UnauthorizedException('permissions denied');
        }
        console.log('payload', payload.role, roles);
        console.log('payload', roles.includes(payload.role));
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
