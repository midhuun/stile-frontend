import {Product } from "./CategoryType";

export interface CartType extends Product{
   quantity:number,
   size:any
}