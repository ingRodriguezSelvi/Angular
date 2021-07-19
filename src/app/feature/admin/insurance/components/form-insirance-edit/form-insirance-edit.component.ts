import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog,MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs/operators';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IinsiranceModel, resultInsirance, _Iinsirance } from 'src/app/models/insiranceModel';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import { IstateModel } from 'src/app/models/stateModel';
import { InsiranceService } from '../../services/insirance.service';

@Component({
  selector: 'app-form-insirance-edit',
  templateUrl: './form-insirance-edit.component.html',
  styleUrls: ['./form-insirance-edit.component.scss']
})
export class FormInsiranceEditComponent implements OnInit {
  required = true;
  hasError = false;
  error = 'The input has an error!';
  insiranceForm!: FormGroup; //= new FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateofBirth = new Date();
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  tlfmask= [/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myModel: any;
  tlfModel:any;
  tlfContactModel:any;
  tiporif = [
    { type: 'V', name: 'V' },
    { type: 'E', name: 'E' },
    { type: 'J', name: 'J' },
    { type: 'P', name: 'P' },
    { type: 'G', name: 'G' }
  ];
  typeinst = [
    { type: 'Pub', name: 'Publica' },
    { type: 'Pri', name: 'Privada' },
  ];
  typeins = [
    { type: 'S', name: 'Seguro' },
    { type: 'E', name: 'Empresa' },
  ];

  country: any;
  state: any;
  cities: any;
  municipality: any;

  dataView: any;
  dataPatient: any;
  dataRepon:any;
  dataUser: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //nombre del servicio
    private Servi: InsiranceService,
  ) { }

  ngOnInit(): void {
    //ui-loader
   this.ngxService.start();
   setTimeout(() => {
     this.ngxService.stop();
   }, 100);

   this.dataView = this.Servi.refresh.asObservable();
   // console.log("this.dataUser ",this.dataView);
   this.dataView.subscribe((res: any) => {
     this.dataUser = res;

     //this.status = this.dataUser === null ? false : true;
     //this.initFormMode();
     console.log("this.dataUser ",this.dataUser);
     if (this.dataUser == null) {
       this.router.navigateByUrl("insurance");
     }
     else {
       //console.log("cargando hacia initFormMode",);
       //  this.patientServi.getpatients(this.dataUser).subscribe(data=>{
       //     let patient:IpatientModel=data;
       //     this.dataPatient=patient.result.list});
       //   console.log("this.dataPatient ",this.dataPatient)
       //        this.initFormMode();
       this.initFormMode();

     }
   });
  }

  onChangeCountry(event: any) {
    this.onState(event.value);
    this.onCities(event.value);
    this.onMunicipality(event.value);
  }
  onChangeState(event: any) {
    this.onCities(event.value);
    this.onMunicipality(event.value);
  }
  onCountry() {
    this.Servi.getCountry().subscribe((data) => {
      let Country: IcountryModel = data;
      this.country = Country;
    });
  }
  onState(country: number) {
    this.Servi.getState(country).subscribe((data) => {
      let state: IstateModel = data;
      this.state = state;
    });
  }
  onCities(state: number) {
    this.Servi.getCities(state).subscribe((data) => {
      let cities: IcitiesModel = data;
      this.cities = cities;
    });
  }
  onMunicipality(state: number) {
    this.Servi.getMunicipality(state).subscribe((data) => {
      let Municipality: ImunicipalityModel = data;
      this.municipality = Municipality;
    });
  }
  onCancel() {
    this.router.navigateByUrl('insurance');
  }

  getFormData(): Partial<_Iinsirance> {
    let raw = this.insiranceForm.value;
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let tlf=''
    let tlfcontact=''
    if(raw.tlf.length>0){tlf=raw.tlf.replace("-","").replace("-","")}
    if(raw.tlfcontact.lenght>0){tlfcontact=raw.tlfcontact.replace("-","").replace("-","")}

    let patient: Partial<_Iinsirance> = {
      Id: raw.id,
      Tipo_institucion: raw.tname,
      Tipo_seguro: raw.type,
      razon_social: raw.name.toUpperCase().trim(),
      Pre_rif: raw.tiporif,
      Rif: raw.rif,
      // Pais: raw.country,
      // Estado: raw.state,
      // Ciudad: raw.cities,
      //Municipio: raw.municipality,
      Telefonos: tlf,
      Email: raw.mail,
      Direccion: raw.address.toUpperCase().trim(),
      Nombre_contacto: raw.namecontact.toUpperCase().trim(),
      Apellido_contacto: raw.lastnameconact.toUpperCase().trim(),
      Email_contacto: raw.mailcontact,
      Telefonos_contacto: tlfcontact,
      Usuario_ins:1

    };
    return patient;
  }


  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.Servi.getByRif(rifSearch).pipe(
      map((resp) => {
        return resp && resp.length > 0 ? { rifTaken: true } : null;
      })
    );
  }
  initFormMode() {
    this.Servi.getInsirances(this.dataUser).subscribe(data => {
      let patient: resultInsirance = data.result;
      this.dataPatient = patient
      // this.onCountry();
      // this.onState(this.dataPatient.pais);
      // this.onCities(this.dataPatient.estado);
      // this.onMunicipality(this.dataPatient.estado);
      //02415158060
      console.log("tlf ",this.dataPatient.telefonos)
      let tlf=''
    let tlfcontact=''
    if(this.dataPatient.telefonos.length>0){tlf=this.tlfModel};//this.dataPatient.telefonos.replace("-","").replace("-","")}
    if(this.dataPatient.telefonos_contacto.lenght>0){tlfcontact=this.tlfContactModel};//this.dataPatient.telefonos_contactoreplace("-","").replace("-","")}
    this.tlfModel=this.dataPatient.telefonos
    this.tlfContactModel=this.dataPatient.telefonos_contacto

    console.log("tlf ",this.dataPatient.telefonos)
      this.insiranceForm = this.fb.group({
        id: [this.dataPatient ? this.dataPatient.id :'', Validators.required],
        tname: [this.dataPatient ? this.dataPatient.tipo_seguro :'', Validators.required],
        type: [this.dataPatient ? this.dataPatient.tipo_institucion :'', Validators.required],
        name: [this.dataPatient ? this.dataPatient.razon_social :'', Validators.required],
        tiporif: [this.dataPatient ? this.dataPatient.pre_rif :'', Validators.required],
        rif: [this.dataPatient ? this.dataPatient.rif :'', [Validators.required, Validators.minLength(6), Validators.maxLength(10)], this.validateRifNotTaken.bind(this)],
        country: [this.dataPatient ? this.dataPatient.pais :'', Validators.required],
        state: [this.dataPatient ? this.dataPatient.estado :'', Validators.required],
        cities: [this.dataPatient ? this.dataPatient.ciudad :'', Validators.required],
        municipality: [this.dataPatient ? this.dataPatient.municipio :'', Validators.required],
        tlf: [this.dataPatient ? tlf :'', [Validators.required, Validators.minLength(7),]],
        mail: [this.dataPatient ? this.dataPatient.email :'', [Validators.required, Validators.email]],
        address: [this.dataPatient ? this.dataPatient.direccion :''],

        namecontact: [this.dataPatient ? this.dataPatient.nombre_contacto :''],
        lastnameconact: [this.dataPatient ? this.dataPatient.apellido_contacto :''],
        mailcontact: [this.dataPatient ? this.dataPatient.email_contacto :'', [Validators.email]],
        tlfcontact: [this.dataPatient ? tlfcontact :''],

        trif: [null],
      });
    });
  }


  onSubmit() {
    let patient: Partial<_Iinsirance> = this.getFormData();
    console.log('formulario ', patient)

    this.Servi.updateInsirance(patient).subscribe(data => {
      let patient: IinsiranceModel = data;
      //console.log('respuesta ', patient.statusCode);

      if (patient.statusCode != 200) {
        console.log(
          "Message: " + patient.message + " statusCode " + patient.statusCode
        )
        this.snackbar.open(patient.message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['danger-snackbar']
        });
      } else {
        switch (patient.succeeded) {
          case true:
            this.snackbar.open('Se ha actualizado correctamente', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['success-snackbar']
            });
            this.router.navigateByUrl("insurance");
            break;
          default:
            this.snackbar.open(patient.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['alert-snackbar']
            });
            this.router.navigateByUrl("insurance");
            break;
        }
      }
    });


  }






}
