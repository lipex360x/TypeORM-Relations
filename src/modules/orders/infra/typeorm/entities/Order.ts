import { v4 as uuid } from 'uuid'
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import Order_Product from './Order_Product'

@Entity('orders')
export default class Order {
  @PrimaryColumn('uuid')
  order_id: string;

  @ManyToOne(() => Customer, customer => customer.order)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => Order_Product, order_products => order_products.order, {
    cascade: true
  })
  order_products: Order_Product[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  orderProps () {
    this.order_id = uuid()
  }
}
