import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as crypto from 'crypto'


@Injectable()
export class CryptoService {
    constructor(private configService: ConfigService) {}

    createHash(data: string): string {
        const salt = this.configService.getOrThrow('auth.salt')
        return crypto.scryptSync(data, salt, 32).toString('hex')
    }

    async compareHash(data: string, hash: string): Promise<boolean> {
        const newHash = this.createHash(data)
        return newHash == hash
    }
}