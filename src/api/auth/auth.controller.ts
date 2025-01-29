import {Body, Controller, Post} from "@nestjs/common";
import {customLogger} from "../../utils/logger.helper";
import {AuthService} from "./auth.service";
import {LoginDto, SignupDto} from "./dto";


@Controller('auth')
export class AuthController {
    logger = customLogger;

    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        this.logger.info('Creating a new user...')
        return await this.authService.create(body)
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        this.logger.info(`Login for follow email: ${body.email}`)
        return await this.authService.getOne(body)
    }
}