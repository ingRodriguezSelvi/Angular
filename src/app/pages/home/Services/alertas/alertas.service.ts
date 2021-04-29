import { Injectable } from '@angular/core';
import {ToastrService}from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toast:ToastrService) { }
  showSucces(titulos:string,texto:string){
    this.toast.success(texto,titulos)
  }
  error(titulos:string,texto:string){
    this.toast.success(texto,titulos)
  }

}
