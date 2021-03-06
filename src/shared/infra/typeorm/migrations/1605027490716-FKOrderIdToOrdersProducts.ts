import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class FKOrderIdToOrdersProducts20201110135816
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ordersProducts',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'ordersProducts',
      new TableForeignKey({
        name: 'ordersProductsToOrder',
        columnNames: ['order_id'],

        referencedTableName: 'orders',
        referencedColumnNames: ['order_id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ordersProducts', 'ordersProductsToOrder')
    await queryRunner.dropColumn('ordersProducts', 'order_id')
  }
}
