import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class AddCustomer20201105124648 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
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
            name: 'email',
            type: 'varchar',
            isUnique: true
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
    await queryRunner.dropTable('customers')
  }
}
