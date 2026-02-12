/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Post, Session } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiHeader } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiHeader({name: 'x-user-id', required: true,})
    placeOrder(@CurrentUser('x-user-id') userId: string, @Session() session: Record<string, any>) {
        const userCart = session.carts?.[userId] || [];
        return this.orderService.placeOrder(userCart, userId);
    }
}
