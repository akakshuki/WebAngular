import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public service : OrderService,
    private dialog : MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm){
  if(form=null)
    form.resetForm();
    this.service.formdata ={
      ID : null,
      No: Math.floor(100000+Math.random()*900000).toString(),
      CusId: 0,
      PMethod:'',
      GTotal: 0
    };
    this.service.orderItems = []
  }
  AddOrEditOrderItem(orderItemIndex,OrderId){
   const dialogConfig = new MatDialogConfig();
   dialogConfig.autoFocus = true;
   dialogConfig.disableClose = true;
   dialogConfig.width = "50%";
   dialogConfig.data={orderItemIndex,OrderId}
    this.dialog.open(OrderItemsComponent,dialogConfig  )
  }
  DeleteOrderItem(OrderItemId : number, i : number){
    this.service.orderItems.splice(i,1);
   }
}
