import { Controller, Get, Query } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPharmacyDto } from './dto/get-pharmacy.dto';

@ApiTags('pharmacies')
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Get('de-garde')
  async getPharmaciesDeGarde(@Query() payload: GetPharmacyDto) {
    const pharmaciesDeGarde = await this.pharmaciesService.getPharmacies(
      payload,
    );
    return { pharmaciesDeGarde };
  }
}
