import { ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';
import { Entity, Column, CreateDateColumn, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class WeatherStatus {
  
  @ObjectIdColumn()
  id: ObjectID

  @ApiProperty()
  @Column()
  city: string;

  @Column()
  currentTemp: number;

  @Column()
  tempMin: number;

  @Column()
  tempMax: number;

  @Column({ default: '°C' })
  units: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', })
  public created_at: Date;

  constructor(data: any = null) {
    if (data) {
      this.city = data.name;
      this.currentTemp = data.main.temp;
      this.tempMin = data.main.temp_min;
      this.tempMax = data.main.temp_max;
      this.units = '°C'
    }
  }
}