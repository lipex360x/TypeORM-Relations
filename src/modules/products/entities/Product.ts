import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm'

@Entity('products')
export default class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('int')
  quantity: string;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  productProps () {
    this.id = uuid()
  }
}
