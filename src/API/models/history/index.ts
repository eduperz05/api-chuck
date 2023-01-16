import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({
  tableName: "history"
})
export class History extends Model<History> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
    id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    id_chuck_norris_api!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    search!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
    value!: string;
    
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    url!: string;
    
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    icon_url!: string;
}