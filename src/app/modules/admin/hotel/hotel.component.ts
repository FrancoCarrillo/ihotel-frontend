import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Hotel} from '../components.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HotelService} from './services/hotel.service';


@Component({
    selector     : 'hotel',
    templateUrl  : './hotel.component.html',
    styleUrls  : ['./hotel.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HotelComponent implements OnInit{
    hotel: Hotel;
    modifyHotelDrawer: boolean = false;
    selectHotel: Hotel;
    hotels: Array<Hotel> = [];
    numberHotels: number = this.hotels.length - 1;

    constructor(private _snackBar: MatSnackBar, private _hotelService: HotelService) {
    }

    ngOnInit(): any {
        this.hotel = {} as Hotel;
        this._hotelService.getAllHotels().subscribe((response: any) => {
            this.hotels = response;
            console.log(this.hotels);
        });
    }

    addHotel(): any {
         if(this.hotel.name !== undefined && this.hotel.address !== undefined){
            this.numberHotels++;
            const hotel = {
                businessId: 6,
                administratorId: 5,
                name: this.hotel.name,
                address: this.hotel.address
            };
            this._hotelService.createHotel(hotel).subscribe((response: any) => {
                console.log(response);
                this.hotels.push({
                    id: response.id,
                    name: this.hotel.name,
                    address: this.hotel.address
                });
                this.hotel = {} as Hotel;
            });
        } else {
             this._snackBar.open('Data Invalid', 'Okay',{
                 duration: 3000,
                 horizontalPosition: 'end',
                 verticalPosition: 'top'
             });
         }
    }

    deleteHotel(hotel: Hotel): any {
        this._hotelService.deleteHotel(hotel.id).subscribe((response: any) => {
            this.hotels =  this.hotels.filter((value)=>{
                if(value.id !== hotel.id) {return value;}
            });
        });
        this._snackBar.open('Hotel deleted', 'Okay',{
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    updateHotel(): any{

        if(this.hotel.name !== ''){
            this._hotelService.updateHotel(this.selectHotel.id, this.selectHotel).subscribe((response: any) => {
                this.hotels = this.hotels.map((value: Hotel) =>{
                    if(value.id === this.hotel.id){
                        value= this.hotel;
                    }
                    return value;
                });
            });
            this._snackBar.open('Hotel updated', 'Okay',{
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });

            this.modifyHotelDrawer = false;
            this.hotel = {} as Hotel;
        }
        else{
            this.hotels = this.hotels.map((value: Hotel) =>{
                if(value.id === this.hotel.id){
                    value.name= this.selectHotel.name;
                    value.address= this.selectHotel.address;
                }
                return value;
            });

            this._snackBar.open('Data Invalid', 'Okay',{
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
        }
    }

    updateSelectionHotel(hotel: Hotel): any {
        this.modifyHotelDrawer = true;
        this.hotel = hotel;
        this.selectHotel = {
            id: this.hotel.id,
            name: this.hotel.name,
            address: this.hotel.address
        };
        console.log(this.selectHotel);
    }

    deleteHotelConfirmation(hotel: Hotel): any {

        const confirmDelete = window.confirm(`¿Are you sure to delete ${hotel.name}?`);

        console.log(hotel);
        if(confirmDelete) {
            this.deleteHotel(hotel);
        }
    }

    cancelUpdateHotel(): any {
        this.modifyHotelDrawer = false;

        this.hotels = this.hotels.map((value: Hotel) =>{
            if(value.id === this.hotel.id){
                value.name= this.selectHotel.name;
                value.address= this.selectHotel.address;
            }
            return value;
        });

        this.hotel = {} as Hotel;
    }

}

