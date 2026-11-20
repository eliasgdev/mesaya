// =====================================
// MOLECULE — PRODUCT FORM
// =====================================

import { Component, OnInit, input, output, signal } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { InputNumberComponent } from '../../atoms/input-number/input-number';
import { Producto, ProductoRequest } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [InputFieldComponent, InputNumberComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent implements OnInit {
  readonly producto = input<Producto | null>(null);
  readonly categorias = input<string[]>([]);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly guardar = output<ProductoRequest>();
  readonly cancelar = output<void>();

  readonly nombre = signal('');
  readonly descripcion = signal('');
  readonly categoria = signal('');
  readonly precio = signal<number | null>(null);
  readonly stock = signal<number | null>(0);
  readonly disponible = signal(true);
  readonly errorLocal = signal<string | null>(null);

  ngOnInit(): void {
    const p = this.producto();
    if (p) {
      this.nombre.set(p.nombre);
      this.descripcion.set(p.descripcion ?? '');
      this.categoria.set(p.categoria);
      this.precio.set(p.precio);
      this.stock.set(p.stock);
      this.disponible.set(p.disponible);
    }
  }

  onSubmit(): void {
    const precio = this.precio();
    const stock = this.stock();
    if (!this.nombre().trim() || !this.categoria().trim()) {
      this.errorLocal.set('El nombre y la categoría son obligatorios.');
      return;
    }
    if (precio === null || precio <= 0) {
      this.errorLocal.set('El precio debe ser mayor a 0.');
      return;
    }
    if (stock === null || stock < 0 || !Number.isInteger(stock)) {
      this.errorLocal.set('El stock debe ser un número entero, 0 o mayor.');
      return;
    }
    this.errorLocal.set(null);
    this.guardar.emit({
      nombre: this.nombre().trim(),
      descripcion: this.descripcion().trim() || null,
      categoria: this.categoria().trim(),
      precio,
      stock,
      disponible: this.disponible(),
      imagenUrl: this.producto()?.imagenUrl ?? null,
    });
  }
}
