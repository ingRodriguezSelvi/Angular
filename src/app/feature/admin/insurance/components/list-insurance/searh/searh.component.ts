import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IinsiranceModel } from 'src/app/models';
import { InsiranceDataService } from '../../../services/insirance-data.service';
import { InsiranceService } from '../../../services/insirance.service';

@Component({
  selector: 'searh-insurance',
  templateUrl: './searh.component.html',
  styleUrls: ['./searh.component.scss']
})
export class SearhComponent implements OnInit {
  title='Seguro / Particular';
  navigateListUrl='patient';
  navigateAddUrl='';
  navigateEditUrl='';
  icoselect ='done';
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = true;

  dataSource!:any;
  displayedColumns = ['rif','razon_social',  'Teléfono', 'id'];

  iForm = this.fb.group({
    buscar: ['']
  })

  SelectSegu=0;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private seguros:InsiranceService,

  ) { }

  ngOnInit(): void {
    // this.ngxService.start();
    // setTimeout(() => {
    //   this.ngxService.stop();
    // }, 100);
    this.onSearchInsurance();
  }



  onCancel() {
    this.router.navigateByUrl(this.navigateListUrl);
  }
  onSearchInsurance(){
    let search= this.iForm.value
    console.log("search ", search.buscar)
    this.seguros.getInsirance(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let insurance: IinsiranceModel = data;
      this.dataSource = insurance.result.list
    })
  }

  onSearchInsuranceChange(event: any){
    //console.log("event ",event)
    let search= this.iForm.value
    console.log("search.buscar.length ",search.buscar.length)
    if(search.buscar.length>=0){
    this.seguros.getInsirance(this.pageIndex, this.pageSize, search.buscar, this.todas)
    .subscribe(data => {
      let insurance: IinsiranceModel = data;
      this.dataSource = insurance.result.list
    })}
    else{
      this.seguros.getInsirance(this.pageIndex, this.pageSize, '', this.todas)
    .subscribe(data => {
      let insurance: IinsiranceModel = data;
      this.dataSource = insurance.result.list
    })
    }
  }



  onChangePage(event: any) {
    //console.log(event);
    if (event.pageIndex == 0) {
      this.pageIndex = 1
    } else {
      this.pageIndex = event.pageIndex;
    }
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.seguros.getInsirance(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
    })
  }

  onSelectCheck(event: any){
    //this.icoselect='check_box';
    this.iForm.valid==true;
    //console.log("onSelectCheck", event);
    this.seguros.refreshData(event);
    this.SelectSegu=event;



  }

}
