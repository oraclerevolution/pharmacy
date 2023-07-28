import { Controller, Get, Query } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';

@Controller('pharmacies')
export class PharmaciesController {
    constructor(private readonly pharmaciesService: PharmaciesService) {}

    @Get('de-garde')
  async getPharmaciesDeGarde(@Query('commune') commune: string) {
    const pharmaciesDeGarde = await this.pharmaciesService.getPharmacies(commune);
    return { pharmaciesDeGarde };
  }
}
