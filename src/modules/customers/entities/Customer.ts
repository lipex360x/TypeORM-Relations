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
import Order from '@modules/orders/entities/Order'

@Entity('customers')
export default class Customer {
  @PrimaryColumn()
  id: string;

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
    this.id = uuid()
  }
}
