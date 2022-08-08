import { Component, OnInit, Input, ViewEncapsulation, Inject, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, DialogRole } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import {Clients} from '../../model/clients';

@Component({
    selector: 'dialog-register',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    registerForm !: FormGroup;
    actionButton: string = 'Save';

    constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<RegisterComponent>, private clientsService: ClientsService) { }


    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                id: [''],
                name: ['', [Validators.required, Validators.minLength(3)]],
                surname: ['', [Validators.required, Validators.min(3)]],
                email: ['', [Validators.required, Validators.email]],
                phoneNumber: ['', [Validators.required]],
                address: ['', [Validators.required]],
                dni: ['', [Validators.required]],
            }
        );
        this.actionButton = this.data.actionButton;
        if (this.data.client) {
            this.registerForm.patchValue(this.data.client);
        };
    }

    action(): void {
        if (this.registerForm.valid) {
            if (this.actionButton === 'Save') {
                console.log(this.registerForm.value);

                const newGuest: any = {
                    'name': this.registerForm.value.name,
                    'surname': this.registerForm.value.surname,
                    'email': this.registerForm.value.email,
                    'phoneNumber': String(this.registerForm.value.phoneNumber),
                    'address': this.registerForm.value.address,
                    'dni': String(this.registerForm.value.dni)
                };

                console.log(newGuest);
                this.clientsService.createClient(newGuest).subscribe((response) => {
                    this.dialogRef.close('save');
                });

            }

        }
    }

}
