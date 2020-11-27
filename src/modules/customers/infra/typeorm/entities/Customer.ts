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
import Order from '@modules/orders/infra/typeorm/entities/Order'

@Entity('customers')
export default class Customer {
  @PrimaryColumn()
  customer_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Order, orders => orders.customer)
  order: Order[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  customerProps () {
    this.customer_id = uuid()
  }
}
