import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ObjectID } from 'typeorm';

@Exclude()
export class ReadWeatherStatusDto {

  private readonly id: ObjectID;

  @Expose()
  @IsString()
  private readonly city: string;

  @Expose()
  @IsNumber()
  private readonly currentTemp: number;

  @Expose()
  @IsNumber()
  private readonly tempMin: number;

  @Expose()
  @IsNumber()
  private readonly tempMax: number;

  @Expose()
  private readonly created_at: Date;
}