import { BaseModels } from "../../core/BaseModels";
import { ServiceCreateDto } from "./ServiceCreateDto";


export class ServiceCreate extends BaseModels<ServiceCreateDto> implements ServiceCreateDto {
  name?: string | null = null;
  description?: string | null = null;
  serviceTime?: string | null = null;
  price?: number | null = 0;
  img?: string | null = null;
  providers?: number | null = null;
  servicesTypes?: number | null;
  employees?: string | number | null = null;

  constructor(data: Partial<ServiceCreateDto> = {}) {
    super(data);

    Object.assign(this, data);

    if (typeof data.price === 'string' || typeof data.price === 'number') {
      const parsedPrice = Number(data.price);
      this.price = isNaN(parsedPrice) ? 0 : parsedPrice;
    }
  }
}
