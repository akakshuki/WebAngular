import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private service : OrderService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm){
  if(form=null)
    form.resetForm();
    this.service.formdata ={
      ID : null,
      No: Math.floor(100000+Math.random()*9000).toString(),
      CusId: 0,
      PMethod:'',
      GTotal: 0
    };
    this.service.orderItems = []
  }
  AddOrEditOrderItem(orderItemIndem,OrderId)
}
