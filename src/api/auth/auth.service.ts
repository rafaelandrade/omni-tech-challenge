import {Injectable} from "@nestjs/common";
import {CryptoService} from "./crypto.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {LoginDto, SignupDto} from "./dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./schemas";
import {Repository} from "typeorm";


@Injectable()
export class AuthService {
    private privateKey: string;
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
        private cryptoService: CryptoService,
        private jwtService: JwtService,
        private configService: ConfigService) {
        this.privateKey = this.configService.getOrThrow('auth.jwtPrivateKey')
    }

    async create(input: SignupDto) {
        const existingUser = await this.user.findOne({
            where: { email: input.email }
        })

        if (existingUser) {
            throw new Error('Customer with this email already exists');
        }

        const hashedPassword = this.cryptoService.createHash(input.password)
        const newUser = this.user.create({
            email: input.email,
            password: hashedPassword
        });

        return await this.user.save(newUser);
    }

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

    async getOne(input: LoginDto) {
        const existingUser = await this.user.findOne({
            where: { email: input.email }
        })

        if (!existingUser) throw new Error('User not found!')
        const isValid = await this.cryptoService.compareHash(input.password, existingUser.password)
        if (!isValid) throw new Error('Invalid Password!')

        return {
            accessToken: await this.generateRefreshToken(existingUser)
        }
    }
}