import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from './env.parse'


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
            load: [config]
        })
    ],
    providers: [ConfigService]
})
export class EnvModule {}