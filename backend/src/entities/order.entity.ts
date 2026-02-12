/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderStatusEnum } from "src/enum/order-status.enum";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'float' })
    productTotal: number;
    
    @Column({ type: 'float' })
    shippingCharge: number;

    @Column({ type: 'float' })
    total: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    cancelledBy: string;

    @Column({ type: 'timestamp', nullable: true })
    cancelledAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deliveredAt: Date;

    @Column({ type: 'enum', name: 'order_status', enum: OrderStatusEnum, default: OrderStatusEnum.PLACED })
    ordersStatus: OrderStatusEnum;

    @ManyToOne(()=> Customer)
    @JoinColumn({ name: 'customer_id' })    
    customer : Customer;


}