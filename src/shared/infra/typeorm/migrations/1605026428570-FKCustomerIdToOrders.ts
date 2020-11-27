import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class FKCustomerIdToOrders20201110134053
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'ordersToCustomer',
        columnNames: ['customer_id'],

        referencedTableName: 'customers',
        referencedColumnNames: ['customer_id'],

        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'ordersToCustomer')
    await queryRunner.dropColumn('orders', 'customer_id')
  }
}
