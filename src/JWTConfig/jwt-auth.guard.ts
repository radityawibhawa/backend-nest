import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        console.log('Token:', context.switchToHttp().getRequest().headers.authorization);
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            console.log('Error:', err);
            console.log('User:', user);
            console.log('Info:', info);
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
