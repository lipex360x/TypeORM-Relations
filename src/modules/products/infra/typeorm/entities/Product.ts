import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm'
import Order_Product from '@modules/orders/entities/Order_Product'

@Entity('products')
export default class Product {
  @PrimaryColumn('uuid')
  product_id: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @OneToMany(() => Order_Product, order_products => order_products.product)
  order_products: Order_Product[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  productProps () {
    this.product_id = uuid()
  }
}
