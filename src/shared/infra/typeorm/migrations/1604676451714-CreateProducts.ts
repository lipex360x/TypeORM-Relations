import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateProducts20201106122744 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'name',
            type: 'varchar'
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
    await queryRunner.dropTable('products')
  }
}
