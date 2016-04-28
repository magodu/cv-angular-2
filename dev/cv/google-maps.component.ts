import {Component, OnChanges, provide} from 'angular2/core';
import {
    MapsAPILoader,
    NoOpMapsAPILoader,
    MouseEvent,
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';
import {Marker} from "./shared/marker.interface";

@Component({
    selector: 'google-maps',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    inputs: ['myMapOptions'],
    styles: [`
        .sebm-google-map-container {
            height: 100%;
            width: 100%;
        }
    `],
    template: `
        <sebm-google-map 
            [latitude]="mapOptionsDefaults.lat"
            [longitude]="mapOptionsDefaults.lng"
            [zoom]="mapOptionsDefaults.zoom"
            [disableDefaultUI]="false">
        
            <sebm-google-map-marker *ngFor="#m of markers; #i = index"
                [latitude]="m.lat"
                [longitude]="m.lng"
                [label]="m.label"
                [title]="m.city"
                [markerDraggable]="m.draggable"
            >
                <sebm-google-map-info-window [disableAutoPan]="false">
                    <div style="overflow: auto;">
                        <h3 class="info-window">{{m.city}}</h3>
                        <div class="infoWindowContent">{{m.label}}</div>
                    </div>
                </sebm-google-map-info-window>
            </sebm-google-map-marker>
        </sebm-google-map>
    `
})
export class GoogleMapsComponent implements OnChanges {

    myMapOptions: Object = {};

    mapOptionsDefaults: Object = {
        zoom: 6,
        lat: 40,
        lng: -3
    };

    markers: Marker[] = [
        {
            lat: 42.3133735,
            lng: -71.0571571,
            city: 'Boston',
            label: '• Currently working and living here.',
            draggable: false
        }, {
            lat: 40.4379543,
            lng: -3.6795367
            city: 'Madrid',
            label: '• Last city where I\'ve lived.',
            draggable: false
        }
    ];

    ngOnChanges(): any {
        this.mapOptionsDefaults = this.myMapOptions;
    }
}

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    city: string;
    label?: string;
    draggable: boolean;
}
