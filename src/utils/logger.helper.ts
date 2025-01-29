import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Logger } from '@ballin-team/lib-apm';

export const customLogger = new Logger({
    name: 'omnichallenge_api',
    minLevel: 'info',
    displayRequestId: true,
    suppressStdOutput: false,
});

@Injectable()
export class LoggerService extends ConsoleLogger {
    client = customLogger;

    constructor() {
        super();
    }

    log(message: any, ...optionalParams: any[]) {
        this.client.info(message, optionalParams);
    }

    fatal(message: any, ...optionalParams: any[]) {
        this.client.fatal(message, optionalParams);
    }

    error(message: any, ...optionalParams: any[]) {
        this.client.error(message, optionalParams);
    }

    warn(message: any, ...optionalParams: any[]) {
        this.client.warn(message, optionalParams);
    }

    debug(message: any, ...optionalParams: any[]) {
        this.client.debug(message, optionalParams);
    }

    verbose(message: any, ...optionalParams: any[]) {
        this.client.debug(message, optionalParams);
    }
}
