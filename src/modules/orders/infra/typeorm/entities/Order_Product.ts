import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import Order from './Order'
import Product from '@modules/products/infra/typeorm/entities/Product'

@Entity('order_products')
export default class Order_Product {
  @PrimaryColumn('uuid')
  order_products_id: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column('uuid')
  order_id: string;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column('uuid')
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  orderproductsProps () {
    this.order_products_id = uuid()
  }
}
