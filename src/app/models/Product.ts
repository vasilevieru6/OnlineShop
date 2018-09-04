export interface Product {
  id: number,
  nameProduct: string,
  unitPrice: number,
  description: string,
  photoUrl: string,
  category: string;
  subcategories?: (string)[] | null;
}
