import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddPasswordToCustomer1606441114144
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'password')
  }
}
