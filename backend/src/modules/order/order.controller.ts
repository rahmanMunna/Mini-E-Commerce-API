/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Post, Session, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    placeOrder(@CurrentUser('x-user-id') userId: string, @Session() session: Record<string, any>) {
        const userCart = session.carts?.[userId] || [];
        return this.orderService.placeOrder(userCart, userId);
    }
}
