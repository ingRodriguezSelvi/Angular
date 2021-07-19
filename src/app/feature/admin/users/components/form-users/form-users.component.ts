import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs/operators';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { usersModel, IusersModel, UserModel, IuserModel } from 'src/app/models';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  title='usuario';
  Urlnavform='users';
  Urlnavformedit='formeditusers';
  Urlnavlist='';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  tlfmask= [/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myModel: any;
  tlfModel:any;
  tlfContactModel:any;
  dateofBirth = new Date();
  newPassword: string = "";
  //form name
  iForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    tiporif: ['', Validators.required],
    cedula: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)],
    ],
    sex:[''],
    tlfcel: ['', [Validators.required,]],
    mail: ['', [Validators.required, Validators.email]],
    address: [''],
    role:[''],




    trif: [null],
  });

  tiporif = [
    { type: 'V', name: 'V' },
    { type: 'E', name: 'E' },
    { type: 'J', name: 'J' },
    { type: 'P', name: 'P' },
    { type: 'G', name: 'G' }
  ];
  tiposex = [
    { type: 'M', name: 'Masculino' },
    { type: 'F', name: 'Femenino' },
  ];

  roles= [
    {id:"1", name:'ADMINISTRADOR'},
    {id:"2", name:'MEDICO'},
    {id:"3", name:'ENFERMERA'},
    {id:"4", name:'ADMISIONISTA'},
    {id:"5", name:'LAB'},
    {id:"6", name:'RX'},
    {id:"7", name:'USUARIO'},
  ];

  //userRoles: Observable<RoleModel[]>;
  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //services name
    private servi: UsersService,
  ) { }

  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }

  onCancel() {
    this.router.navigateByUrl(this.Urlnavform);
  }
  onSubmit() {
    //let patient: Partial<_Iinsirance> = this.getFormData();
    let patient: Partial<UserModel> = this.getFormData();
    let patients: IuserModel

    console.log("patient ",patient);
    //errorMessage

    if (typeof patient === "undefined") {
      const dialogConfig= new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.data={
        icon:'warning',
        message: 'Complete los campos faltantes',
        buttonText: {
          cancel: 'Aceptar',
        },
      }
      const dialogRef = this.dialog.open(AlertDialogComponent,dialogConfig);
    }
    else
    {
      if(this.iForm.valid){
      //add
        const dialogRef = this.dialog.open(ConfirmationDialog, {
          data: {
            message: '¿Estás seguro de que quieres guardar?',
            buttonText: {
              ok: 'Si',
              cancel: 'No',
            },
          },
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            try{
              this.servi.add(patient).subscribe((data) => {
                patients = data;

                  this.snackbar.open(patients.message, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                    panelClass: [!patients.succeeded ? 'danger-snackbar' : 'success-snackbar'],
                  });
                  if (patients.succeeded) {
                    this.router.navigateByUrl(this.Urlnavform);
                }
              });

            }
            catch (err){
                console.log("error",err.message)
                this.snackbar.open('', '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
                panelClass: ['alert-snackbar'],
              });
            }
          } else {
            this.snackbar.open('Cancelo el agregar', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['idb-snackbar'],
            });
          }
        });
      }
      else
      {
        const dialogConfig= new MatDialogConfig();
          dialogConfig.disableClose=true;
          dialogConfig.autoFocus=true;
          dialogConfig.data={
            icon:'warning',
            //icon:'done',
            //icon:'dangerous',
            message: 'Complete los campos faltantes',
            buttonText: {
              cancel: 'Aceptar',
            },
          }
          const dialogRef = this.dialog.open(AlertDialogComponent,dialogConfig);
      }
    }
  }

  getFormData(): Partial<UserModel>|any {
    let raw = this.iForm.value;

    console.log("raw ", raw)
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let tlf = ''
    let tlfcontacts = ''

    tlf = raw.tlfcel.replace("-", "").replace("-", "");

    if (tlf.includes('_') ){
      //console.log("entre cel");
     document.getElementById("tlfm")?.focus();
      return
    }
    console.log("tlf ", tlf);
    this.generatePassword();
    let email: string = this.iForm.value.mail;
    let password: string = this.newPassword;
    console.log("password ",password)

    let patients: Partial<UserModel>={
      usuario:
      {  nombres: raw.name.toUpperCase().trim(),
        apellidos: raw.lastname.toUpperCase().trim(),
        sexo: raw.sex,
        direccion: raw.address.toUpperCase().trim(),
        pre_rif: raw.tiporif,
        rif: raw.cedula,
        tipo: "0",
        telefonos: tlf,
        email: raw.mail,
        status: 1,
        usuario_ins: 1}
      ,
      username: raw.cedula,
      password: password,
      rol: raw.role
    }
    return patients;
  }


  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.servi.getByRif(rifSearch).pipe(
      map((resp) => {
        return resp && resp.length > 0 ? { rifTaken: true } : null;
      })
    );
  }


  onChangeFocusOption(e:any,id:string){
    document.getElementById(id)?.focus();
  }

  onChangeFocus(e:any,id:string){
    if(e.key=="Enter"){
      document.getElementById(id)?.focus();
    }
  }

  generatePassword() {
    let numberChars = "0123456789";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let allChars = numberChars + upperChars + lowerChars;
    let randPasswordArray = Array(12);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] }));
  }

  shuffleArray(strongPassword: any[]) {
    for (let i = strongPassword.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = strongPassword[i];
      strongPassword[i] = strongPassword[j];
      strongPassword[j] = temp;
    };
    this.newPassword = strongPassword.join("");
  }


}
