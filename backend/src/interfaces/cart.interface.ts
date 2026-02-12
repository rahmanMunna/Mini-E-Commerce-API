/* eslint-disable prettier/prettier */
declare module 'express-session' {
    interface SessionData {
        userId?: string;
        cart?: CartItem[];

    }
}

export interface CartItem {
    productId: number;
    qty: number;
    addedAt: Date;
}