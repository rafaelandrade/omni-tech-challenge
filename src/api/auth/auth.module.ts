import {Module} from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from "./auth.controller";
import {CryptoService} from "./crypto.service";
import {AuthService} from "./auth.service";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth.guard";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./schemas";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow('auth.jwtPrivateKey'),
                signOptions: { expiresIn: '1h' },
            })
        })
    ],
    controllers: [AuthController],
    providers: [
        CryptoService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AuthModule {}