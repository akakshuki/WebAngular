import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList
  constructor(private service: OrderService,
    private router: Router,
    private toastrs: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }
  refreshList() {
    this.service.getOrderList().then(res => this.orderList = res);
  }
  openForEdit(orderID: number) {
    //redirect den trang sua thong tin don hang
    this.router.navigate(['/order/edit/' + orderID]);
  }
  deleteOrder(id: number) {
    if (confirm("Are you sure?")) {
      this.service.deleteOrder(id).then(res => {
        this.refreshList();
        this.toastrs.warning("Delete successful!", "Success!");
      });
    }
  }
}
