import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWeatherStatusDTO } from '../dto/CreateWeatherStatusDto.dto';
import { WeatherService } from '../services/weather.service';

@Controller('api/weather')
export class WeatherController {

  constructor(private weatherService: WeatherService) {}

  @ApiTags('Weather')
  @ApiOperation({ summary: 'Consultar el clima de una ciudad' })
  @Get(':city')
  async getWeatherInfo(@Res() res, @Param('city') city: string){
    try{
      const response = await this.weatherService.getCitiesWeatherStatus([city]);
      const cityWeatherStatus = response[0]
      return res.status(HttpStatus.OK).json({
        message: 'success',
        code: 200,
        cityWeatherStatus
      }) 
    }catch(err){
      throw new NotFoundException({ message: 'No se encuentra la ciudad consultada' })
    }
  }

  @ApiTags('Weather')
  @ApiOperation({ summary: 'Consultar el clima de una o varias ciudades en un arreglo de string a través del body' })
  @Post()
  async getCitiesWeatherInfo(@Res() res, @Body() body: CreateWeatherStatusDTO) {
    try{
      if(body.cities.length > 0) {
        const citiesWeatherStatus = await this.weatherService.getCitiesWeatherStatus(body.cities)
        return res.status(HttpStatus.OK).json( {
          message: 'success',
          code: 200,
          citiesWeatherStatus
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json( {
          status: 'Bad Request',
          code: 400,
          message: 'Debe ingresar al menos una ciudad para realizar la consulta',
        })
      }
    }catch(err){
      throw new BadRequestException({ message: 'Hubo un error en su consulta, revise que las ciudades sean válidas' })
    }
  }
}
