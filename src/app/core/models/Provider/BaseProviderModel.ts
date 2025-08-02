import { GenderEnum } from "../../constant/enum";
import { BaseModels } from "../../core/BaseModels";
import { GenericModel } from "../../core/GenericModel";

export interface BaseProviderModel {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  img?: string | null;
  website?: string | null;
  nit?: number| null | null;
  invima?: string | null;
  companyIdentifier?: string | null;
  logoUrl?: string | null;
  description?: string | null;


}


export class BaseProvider extends BaseModels<BaseProviderModel> {

  constructor(data: Partial<BaseProviderModel> = {}) {
    super(data);
  }
}