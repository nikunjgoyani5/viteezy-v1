import { IEntity } from './entity';

export class Ingredient implements IEntity {
  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public code: string;
  public url: string;
  public strapiContentId: number;
  public isAFlavour: boolean;
  public isVegan: boolean;
  public priority: number;
  public isActive: boolean;
  public sku: string;
  public creationTimestamp: Date;
  public modificationTimestamp: Date;
  
  public entityName = 'Ingredient';
  public constructor(init?: Partial<Ingredient>) {
    Object.assign(this, init);
  }
}
