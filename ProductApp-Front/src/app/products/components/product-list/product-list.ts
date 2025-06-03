import { Component, Inject, inject, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { Product } from '../interfaces/products';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule,MatTableModule,MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit{
private dialog = inject(MatDialog);
private router = inject(Router);
private productService = inject(ProductService);
private snackBar = inject(MatSnackBar);
@ViewChild(MatPaginator) paginator!: MatPaginator;

products: WritableSignal<Product[]> = signal<Product[]>([]);
displayedColumns: string[] = ["ID","Name","Stock","Actions"];
dataSource = new MatTableDataSource<Product>([])

ngOnInit(): void {
  this.loadProducts();
  /*this.productService.getProducts().subscribe({
    next:(resp)=>{
      console.log('API Response',resp);

    },
    error:(err)=>{
      console.log('Load product fail', err);
    },
    complete:()=>{

    }
  })*/
}

loadProducts() {
  this.productService.getProducts().subscribe({
    next: (products) => {
      this.products.set(products);      
      this.updateTableData();           
    },
    error: (err) => {
      console.error('Error al cargar productos:', err);
    }
  });
}


updateTableData(){
  this.dataSource.data = this.products();
  this.dataSource.paginator = this.paginator;
}

navigateToForm(id?:number){
const path = id? `/products/edit/${id}` : '/products/new';
this.router.navigate([path]);
}

deleteProduct(id:number){

  const dialogRef = this.dialog.open(ConfirmationDialog);
  dialogRef.afterClosed().subscribe((result)=>{
    if(result){
      this.productService.deleteProduct(id).subscribe(()=>{
        const updateProducts = this.products().filter((product)=>product.id !== id);
        this.products.set(updateProducts);
        this.updateTableData();

          
          this.snackBar.open('Product deleted succsessfully!', 'Close',{
            duration: 3000
          });
      });
    }
  })

}
}
