import {Injectable} from "@nestjs/common";
import {CryptoService} from "./crypto.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {LoginDto, SignupDto} from "./dto";
import {Balance, Transfer, User} from "./schemas";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CatchHandler} from "../../exceptions";
import {UserAlreadyExistException} from "./exceptions/UserAlreadyExist.exception";
import {UserNotExistException} from "./exceptions/UserNotExist.exception";
import {InvalidCredentialsException} from "./exceptions/InvalidPassword.exception";


@Injectable()
export class AuthService {
    private privateKey: string;
    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Transfer.name) private transfer: Model<Transfer>,
        @InjectModel(Balance.name) private balance: Model<Balance>,
        private cryptoService: CryptoService,
        private jwtService: JwtService,
        private configService: ConfigService) {
        this.privateKey = this.configService.getOrThrow('auth.jwtPrivateKey')
    }

    @CatchHandler()
    async create(input: SignupDto) {
        const existingUser = await this.user.findOne({
            email: input.email
        })

        if (existingUser) throw new UserAlreadyExistException(input.email)

        const hashedPassword = this.cryptoService.createHash(input.password)
       const user = await this.user.create({
            email: input.email,
            password: hashedPassword,
            username: input.username,
            birthdate: input.birthdate
        });

        await this.balance.create({
            userId: user._id,
            amount: 0,
        })

        return { email: user.email, username: user.username, birthdate: user.birthdate, message: 'User created!'}
    }

    @CatchHandler()
    async generateRefreshToken(user: any) {
        const nodeEnv = process.env.NODE_ENV.toUpperCase();
        const refreshToken = await this.jwtService.signAsync(
            {
                data: { email: user.email},
                iss: `REFRESH_${nodeEnv}`,
                aud: ['OMNICHALLENGE_API'],
            },
            {
                secret: Buffer.from(this.privateKey, 'base64').toString('ascii'),
                algorithm: 'RS256',
                expiresIn: '1d',
                header: {
                    kid: `public_jwk_${nodeEnv.toLowerCase()}`,
                    alg: 'RS256',
                },
            },
        );
        return refreshToken;
    }

    @CatchHandler()
    async getOne(input: LoginDto) {
        const existingUser = await this.user.findOne({
            email: input.email
        })

        if (!existingUser) throw new UserNotExistException(input.email)
        const isValid = await this.cryptoService.compareHash(input.password, existingUser.password)

        if (!isValid) throw new InvalidCredentialsException()

        return {
            accessToken: await this.generateRefreshToken(existingUser)
        }
    }
}