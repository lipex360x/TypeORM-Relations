import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class AddProductIdToOrderProducts20201110135534
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_products',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'order_products',
      new TableForeignKey({
        name: 'OrderProductProducts',
        columnNames: ['product_id'],

        referencedTableName: 'products',
        referencedColumnNames: ['product_id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order_products', 'OrderProductProducts')
    await queryRunner.dropColumn('order_products', 'product_id')
  }
}
