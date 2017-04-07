import {Component, Input, OnChanges, SimpleChanges } from '@angular/core';


// interfaces.
interface Marker {
    latitude: number;
    longitude: number;
    city: string;
    label?: string;
    draggable: boolean;
}


interface mapData {
    default: Object;
    markers: Marker[];
}


@Component({
    selector: 'google-maps',
    inputs: ['myMapOptions'],
    styles: [`
        .sebm-google-map-container {
            height: 100%;
            width: 100%;
        }
    `],
    templateUrl: 'google-maps.component.html'
})
export class GoogleMapsComponent implements OnChanges {
    @Input() myMapOptions: mapData;

    mapOptionsDefaults: Object = {
        zoom: 6,
        latitude: 40,
        longitude: -3
    };

    markers: Marker[] = [];

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "myMapOptions" changed
        if (changes['myMapOptions']) {
            if(this.myMapOptions) {
                this.mapOptionsDefaults = this.myMapOptions.default;
                this.markers = this.myMapOptions.markers;
            }
        }
    }
}
