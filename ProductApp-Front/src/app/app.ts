import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from "./products/components/product-list/product-list";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ProductApp-Front';
}
