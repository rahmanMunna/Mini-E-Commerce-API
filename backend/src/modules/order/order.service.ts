/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderItems } from 'src/entities/orderItem.entity';
import { Product } from 'src/entities/product.entity';
import { CartItem } from 'src/interfaces/cart.interface';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(OrderItems) private orderItemsRepo: Repository<OrderItems>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        private readonly customerService: CustomerService
    ) { }

    async placeOrder(cart: CartItem[], userId: string) : Promise<{ success: boolean; message: string; order?: Order }> {
        if(cart.length === 0) {
            return { success: false, message: 'Cart is empty' };
        }
        const order = await this.createOrder(cart, userId);
        await this.createOrderItems(order, cart);
        return { success: true, message: 'Order placed successfully',order };
    }

    async createOrder(cart: CartItem[], userId: string): Promise<Order> {
        const customer = await this.customerService.getByUserId(userId);
        
        // Calculate total AND adjust inventory in one go
        const { total, productTotal } = await this.calculateTotalAndUpdateInventory(cart);
        
        const order = this.orderRepo.create({
            productTotal: productTotal,
            shippingCharge: 80,
            customer: customer,
            total: total,
        });

        const savedOrder = await this.orderRepo.save(order);
        await this.createOrderItems(savedOrder, cart);

        return savedOrder;
    }

    private async calculateTotalAndUpdateInventory(cart: CartItem[]): Promise<{ total: number; productTotal: number }> {
        let productTotal = 0;

        for (const item of cart) {
            const product = await this.productRepo.findOne({ 
                where: { id: item.productId } 
            });

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.productId} not found`);
            }

            // Check stock availability
            if (product.stockQty < item.qty) {
                throw new NotFoundException(`Insufficient stock for product ${product.name}. Available: ${product.stockQty}, Requested: ${item.qty}`);
            }

            // Reduce inventory
            product.stockQty -= item.qty;
            await this.productRepo.save(product);

            productTotal += product.price * item.qty;
        }

        return {
            productTotal: productTotal,
            total: productTotal + 80 // shipping charge
        };
    }

    async createOrderItems(order: Order, cart: CartItem[]) {
        for(const item of cart){
            const product = await this.productRepo.findOne({ where: { id: item.productId } });
            if(product){
                const orderItem = this.orderItemsRepo.create({
                    order: order,
                    product: product,
                    qty: item.qty,
                    orderPrice: product.price,
                });
                await this.orderItemsRepo.save(orderItem);
            }
        }
    }


}
