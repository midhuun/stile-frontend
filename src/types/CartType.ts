import {Product } from "./CategoryType";

export interface CartType extends Product{
   quantity:number,
   selectedSize:any
}