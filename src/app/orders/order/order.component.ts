import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customers: Customer[];
  isValid = false;
  constructor(public service: OrderService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService, 
    private router : Router,
    private currentRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let orderId = this.currentRoute.snapshot.paramMap.get('id');
    if(orderId== null){
      this.resetForm();
    }else{
      this.service.getOrderById(parseInt(orderId)).then(res =>{
        this.service.formdata = res.order;
        this.service.orderItems = res.orderDetails;
      })
    }
    this.customerService.getCustomerList().then(res => this.customers = res as Customer[]);
  }
  //reset form neu trong form khong co gi
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formdata = {
      ID: null,
      No: Math.floor(100000 + Math.random() * 900000).toString(),
      CusId: 0,
      PMethod: '',
      GTotal: 0,
      DeletedOrderProductIds: ''
    };
    this.service.orderItems = []
  }

  AddOrEditOrderItem(orderItemIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderId };

    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      //sau khi dong dialog se cho data ve roi update la grand total
      this.UpdateGrandTotal();
    });
  }
  //xoa order San pham
  DeleteOrderItem(OrderItemId: number, i: number) {
    if(OrderItemId != null)
    this.service.formdata.DeletedOrderProductIds += OrderItemId + ',';
    //xoa 1 phan tu thu i trong danh sach order
    this.service.orderItems.splice(i, 1);
    this.UpdateGrandTotal();
  }
  UpdateGrandTotal() {

    this.service.formdata.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total
    }, 0);
    this.service.formdata.GTotal = parseFloat(this.service.formdata.GTotal.toFixed(2))
  }
  validateForm(form: NgForm) {
    //check null Order model 
    this.isValid = true;

    if (this.service.formdata.CusId == 0 || this.service.orderItems.length == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
  onSubmit(form: NgForm) {
    if (this.validateForm) {
      this.service.saveOrUpdateOrder().subscribe(res =>{
         this.resetForm();
         this.toastr.success('Submit Successly!','Success!');
         this.router.navigate(['/orders']);
      })
    }
  }
}
