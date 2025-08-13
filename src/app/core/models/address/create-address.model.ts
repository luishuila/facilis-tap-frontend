import { BaseAddress } from './BaseAddressModel';



export class AddressCreate extends BaseAddress  {
  // Campos propios del payload

  cityStateId?: number;

  // Dueño (elige solo uno)
  providerId?: number;
  userId?: string;

  constructor(data?: Partial<AddressCreate>) {
    super();
    Object.assign(this, data);
  }

  /** Valida que venga exactamente uno: providerId | userId */
  assertSingleOwner(): void {
    const count =
      (this.providerId != null ? 1 : 0) +
      (this.userId != null ? 1 : 0);

    if (count === 0) throw new Error('Debe enviar exactamente uno: providerId o userId.');
    if (count > 1) throw new Error('Envíe solo uno: providerId o userId (no combinados).');
  }

  /** Mapea al payload que envías al backend */
  toDto(): any {
    // Acepta nombres alternos que puedan venir del form/base (latitude/length, cityStates)
    const lat = (this as any).lat ?? (this as any).latitude;
    const lon = (this as any).lon ?? (this as any).length;

    return {
      lat: lat != null ? String(lat) : undefined,
      lon: lon != null ? String(lon) : undefined,
      street: this.street ?? '',
      race: this.race ?? '',
      neighborhood: this.neighborhood ?? '',
      description: this.description || undefined,
      cityStateId: Number((this as any).cityStateId ?? (this as any).cityStates),
      providerId: this.providerId,
      userId: this.userId,
    };
  }

  static fromForm(value: any): AddressCreate {
    return new AddressCreate({
      ...value,
      lat: value.lat ?? value.latitude ?? null,
      lon: value.lon ?? value.length ?? null,
      cityStateId: value.cityStateId ?? value.cityStates,
    });
  }
}
