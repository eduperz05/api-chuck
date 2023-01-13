import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "quote",
})
export class Quote extends Model<Quote> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
    id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    category!: string;

}