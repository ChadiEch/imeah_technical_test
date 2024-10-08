import { JwtPayload } from './jwt-payload.interface.js';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        email: string;
    }>;
}
export {};
