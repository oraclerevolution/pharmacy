import { ApiProperty } from '@nestjs/swagger';

export class GetPharmacyDto {
  @ApiProperty()
  commune: string;
}
