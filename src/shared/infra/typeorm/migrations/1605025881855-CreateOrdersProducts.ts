import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateOrdersProducts20201110133126 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersProducts',
        columns: [
          {
            name: 'order_products_id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'quantity',
            type: 'integer'
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_products')
  }
}
