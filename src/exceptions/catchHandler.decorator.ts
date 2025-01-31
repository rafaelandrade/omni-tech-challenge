import { InternalServerErrorException } from '@nestjs/common';
import { BaseHttpException } from './baseHttpException';
import { customLogger } from "../utils/logger.helper";

export function CatchHandler() {
    return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
        const originalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (e) {
                if (e instanceof BaseHttpException) throw e;

                customLogger.error(e);
                throw new InternalServerErrorException();
            }
        };
    };
}
