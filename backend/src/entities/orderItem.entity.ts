/* eslint-disable prettier/prettier */
import { Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity('order-items')
export class OrderItems {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    qty: number;

    @Column({ type: 'float' })
    orderPrice: number;

    @ManyToOne(()=> Order)
    @JoinColumn({ name: 'order_id' })
    order : Order;

    @ManyToOne(()=> Product)
    @JoinColumn({ name: 'product_id' })
    product : Product;

}