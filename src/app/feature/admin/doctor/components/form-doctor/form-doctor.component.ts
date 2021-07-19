import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IspecialtiesModel } from 'src/app/models/interfaceAdmin';
import { ApiservicesService } from '../../../specialties/services/apiservices.service';

@Component({
  selector: 'app-form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.scss']
})
export class FormDoctorComponent implements OnInit {
  doctorForm = this.fb.group({
    name:[null, Validators.required],
    lastname: [null, Validators.required],
    full_name: [''],

    tiporif: [null, Validators.required],
    cedula: [null, Validators.required],

    colegio: ['', ],
    sanidad: ['', ],
    sex: ['', ],

    specialities: [null, Validators.required],

    address: [null, Validators.required],
    trif: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ]
  });

  hasUnitNumber = false;

  tiporif=[
    {type:'V', name:'V'},
    {type:'E', name:'E'},
    {type:'J', name:'J'},
    {type:'P', name:'P'},
    {type:'G', name:'G'}
  ]
  tiposex = [
    { type: 'M', name: 'Masculino' },
    { type: 'F', name: 'Femenino' },
  ];


  specialities = [
    { type: 'M', name: 'M' },
    { type: 'F', name: 'F' },
  ]

  especialiad: any;


  constructor(
    private fb: FormBuilder,
    private especialidadServi : ApiservicesService
  ) { }

  ngOnInit(): void {
    this.onEspecilidad();
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  onEspecilidad(){
    this.especialidadServi.getespecialides(1,100,'',false).subscribe(data=>{
      let especialiades:IspecialtiesModel=data;
      this.especialiad=especialiades.result.list
   })
  }

}
