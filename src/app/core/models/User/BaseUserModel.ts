import { GenderEnum } from "../../constant/enum";
import { GenericModel } from "../../core/GenericModel";

export interface BaseUserModel {
    name: string;
    lastname: string;
    email: string;
    birth: Date;
    gender: GenderEnum;
  }


export class BaseUser extends GenericModel<BaseUserModel> {
  name: string = '';
  lastname: string = '';
  email: string = '';
  birth: Date = new Date();
  gender: GenderEnum = GenderEnum.OTHER;

  constructor(data: Partial<BaseUserModel> = {}) {
    super(data);
  }
}