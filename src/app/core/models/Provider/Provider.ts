
import { BaseProvider } from './BaseProviderModel';
import { ProviderCreateDto } from './ProviderI';





export class ProviderCreate extends BaseProvider implements ProviderCreateDto {
  nit?: number | null = null;
  userId?: string| null;
  constructor(data: Partial<ProviderCreateDto> = {}) {
    super();
    Object.assign(this, data); 
    if (typeof data.nit === 'string' || typeof data.nit === 'number') {
      const parsedNit = Number(data.nit);
      this.nit = isNaN(parsedNit) ? null : parsedNit;
    }
  }
}

