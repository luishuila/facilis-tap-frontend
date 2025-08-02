import { GenericModel } from "./GenericModel";

export class BaseModels<T> extends GenericModel<T> {

  constructor(data: Partial<T> = {}) {
    super(data);
  }
}