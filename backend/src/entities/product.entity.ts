/* eslint-disable prettier/prettier */

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ApiProperty()
    @Column({ type: 'int' })
    stockQty: number;

    @ApiProperty()
    @Column({ type: 'float' })
    price: number;

    @ApiProperty()
    @Column({ type: 'float' })
    discount: number;

    @ApiProperty()
    @ManyToOne(()=> Category)
    @JoinColumn({ name: 'category_id' })
    category : Category;
}