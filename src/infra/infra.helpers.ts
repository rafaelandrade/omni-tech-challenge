import {INestApplication, ValidationPipe} from "@nestjs/common";
import {customLogger, LoggerService} from "../utils/logger.helper";


export function setMiddleware<T = any>(app: INestApplication<T>) {
    app.useLogger(new LoggerService())
    app.use(customLogger.setContextMiddleware)
    app.useLogger(app.get(LoggerService))
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    );
}