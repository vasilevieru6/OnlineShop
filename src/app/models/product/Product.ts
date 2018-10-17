import {Photo} from '../photo/Photo';

export class Product {
  id: number;
  name: string;
  unitPrice: number;
  description: string;
  photos: Photo[];
  category: string;
  subCategory: string;

}
