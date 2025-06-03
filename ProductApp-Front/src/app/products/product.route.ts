import { Routes } from "@angular/router";
import { ProductList } from "./components/product-list/product-list";
import { ProductForm } from "./components/product-form/product-form";

export const PRODUCT_ROUTES:Routes = [
    {path: '', component: ProductList },
    {path: 'new', component: ProductForm },
    {path: 'edit/:id', component: ProductForm }
    
]