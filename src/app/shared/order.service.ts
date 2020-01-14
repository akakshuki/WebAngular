import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { Item } from './item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formdata: Order;
  orderItems: OrderItem[];
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
     //them vao body mang Order tu formdata va OrderDetail (Destructuring assignment)
      ...this.formdata,
      //ten list san pham bat buoc phai trung voi ten field trong model
      OrderDetails: this.orderItems
    }
    //truyen du lieu di toi api voi du lieu cua body
    return this.http.post(environment.apiUrl + '/Orders', body);
  }
  getOrderList(){
     return this.http.get(environment.apiUrl+'/Orders').toPromise();
  }
  getOrderById(id : number): any{
    //danh sach cua order tra ve khong co kieu nen gan kieur any
    return this.http.get(environment.apiUrl + '/Orders/'+id).toPromise();
  }
  deleteOrder(id : number){
    return this.http.delete(environment.apiUrl + '/Orders/'+id).toPromise();
  }
}
