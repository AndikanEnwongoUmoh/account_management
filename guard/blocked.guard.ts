import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';


@Injectable()
export class BlockedGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    if (user && user.blocked) {
      throw new ForbiddenException('This account is blocked.');
    }

    return true;
  }
}
