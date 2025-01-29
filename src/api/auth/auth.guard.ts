import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthGuard implements CanActivate {
    private readonly privateKey: string;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService) {
        this.privateKey = this.configService.getOrThrow('auth.jwtPrivateKey');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const jwtData = this.jwtService.decode(token);

            request['email'] = jwtData.data;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers['x-authorization'] as string)?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}