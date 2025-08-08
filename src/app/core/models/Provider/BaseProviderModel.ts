import { GenderEnum } from "../../constant/enum";
import { BaseModels } from "../../core/BaseModels";
import { GenericModel } from "../../core/GenericModel";

export interface BaseProviderModel {
  id?: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  img?: any | null;
  website?: string | null;
  nit?: number | null;
  invima?: string | null;
  companyIdentifier?: string | null;
  logoUrl?: any | null;
  description?: string | null;
  status?: string | null;
  rating?: number | null;
  independent?: boolean;
}


export class BaseProvider extends BaseModels<BaseProviderModel> {

  constructor(data: Partial<BaseProviderModel> = {}) {
    super(data);
  }
}