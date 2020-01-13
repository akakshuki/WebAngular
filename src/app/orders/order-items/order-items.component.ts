import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  
  formData: OrderItem;
  itemList: Item[];
  isValid = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogref: MatDialogRef<OrderItemsComponent>,
    private service: ItemService,
    private orderService: OrderService
  ) {
    
    

   }

  ngOnInit() {
    var model : Order;
    this.service.getItemList().then(res => this.itemList = res as Item[]);
    if ( this.data.orderItemIndex == null) {
      this.formData = {
        ID: null,
        ProductName: '',
        OrderId: this.data.orderId,
        Price: 0,
        Quantity: 0,
        Total: 0,
        ProductId: 0
      }
    }else{
      this.formData = Object.assign({},this.orderService.orderItems[this.data.orderItemIndex])
    }
  }
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ProductName = '';
    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ProductName = this.itemList[ctrl.selectedIndex - 1].Name;
    }
    this.UpdateTotal();
  }

  UpdateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }
  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if(this.data.orderItemIndex == null){
      this.orderService.orderItems.push(form.value);}else{
        this.orderService.orderItems[this.data.orderItemIndex]= form.value;
      }
      this.dialogref.close();
    }

  }
  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ProductId == 0 || formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  } 

}

