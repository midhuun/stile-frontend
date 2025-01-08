export type Product = {
    _id:number,
    name:string,
    slug:string,
    description:string,
    createdAt:Date,
    updatedAt:Date,
    images:[],
    discount?:number,
    attributes?:any
    price:number
    category:any,
    subcategory:any,
    discountedPrice?:number
}
export type SubCategory ={
    _id:number,
    name:string,
    slug:string,
    createdAt:Date,
    updatedAt:Date,
    image:string,
    category:any
    products:Product[]
}
export type Category ={
    _id: number;
    name: string;
    subcategories:SubCategory[],
    createdAt:Date,
    updatedAt:Date,
    image:string,
    slug:string,
    startingPrice:Number
}
export type StoreData = {
    products: Product[];
    subCategories: SubCategory[];
    categories: Category[];
  };
export type result = {
    items:StoreData,
    status:'succeeded'| 'loading' | 'idle'
  }