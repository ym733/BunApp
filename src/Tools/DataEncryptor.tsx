const crypto = require('crypto');

export type encryption = {
    message: string,
    key: Buffer,
    iv: Buffer
}

export class DataEncryptor {
    static encryptMessage(message: string): encryption {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return {
            message: encrypted,
            key: key.toString('hex'),
            iv: iv.toString('hex')
        }
    }

    static decryptMessage(message:string, key: string, iv: string): string{
        const bufferKey = Buffer.from(key, 'hex')
        const bufferIV = Buffer.from(iv, 'hex')
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', bufferKey, bufferIV);
        let decrypted = decipher.update(message, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted
    }
}