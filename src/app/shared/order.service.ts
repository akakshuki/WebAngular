import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
formdata : Order; 
orderItems: OrderItem[];
  constructor() { }
}
