import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  productForm: FormGroup;
  isEditMode: boolean = false;

  constructor() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      stock: ['0', [Validators.required, Validators.min(0)]]
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.loadProduct(+params['id']);
      }
    });
  }

  private loadProduct(id: number) {
    this.productService.getProductsById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const productData = { ...this.productForm.value };

    if (this.isEditMode) {
      this.productService.updateProduct(productData.id, productData).subscribe({
        next: () => {
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err)
      });
    } else {
      delete productData.id;
      this.productService.createProducts(productData).subscribe({
        next: () => {
          this.snackBar.open('Product created successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
