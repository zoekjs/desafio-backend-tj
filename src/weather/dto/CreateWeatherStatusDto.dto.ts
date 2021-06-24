import { ApiProperty } from "@nestjs/swagger";

export class CreateWeatherStatusDTO {
  @ApiProperty({ type: [String] })
  cities: string[];
}