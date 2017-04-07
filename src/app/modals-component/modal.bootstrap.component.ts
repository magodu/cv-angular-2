/* Deprecated  */

/*
import { Component, ViewChild, EventEmitter} from '@angular/core';
import { ModalDirective, ModalOptions } from 'ng2-bootstrap/modal';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.bootstrap.component.html',
    outputs: ['modalOutput']
})
export class ModalComponent {

    @ViewChild('modal') public _modal: ModalDirective;                //'_modal' is the identifier #modal in the template
    @ViewChild('alertModal') public _alertModal: ModalDirective;      //'_alertModal' is the identifier #alertModal in the template
    @ViewChild('loadingModal') public _loadingModal: ModalDirective;  //'_loadingModal' is the identifier #loadingModal in the template
    
    modalOutput = new EventEmitter<string>();
    output: string;

    selectedItem: any;

    modalConfig: ModalOptions = {
        backdrop: 'static',
        ignoreBackdropClick: true,
        keyboard: false,
        focus: true,
        show: true
    };

    alertModalDefault: Object = {
        type: 'danger',
        title: 'Error',
        bodyText: ''
    };

    modalDefault: Object = {
        title: 'My modal',
        bodyText: 'My text'
    };

    onHidden(event: Event) {
        this.output = this.selectedItem;
        this.modalOutput.emit(this.output);
    }

    private open(modal: ModalDirective, size?: string) {
        //size ? modal.show(size) : modal.show();
        modal.show();
    }

    closeModal(modal: ModalDirective) {
        modal.hide();
    }

    dismissModal(modal: ModalDirective) {
        this.closeModal(modal);
    }

    showAlertModal(modalData: Object) {
        Object.assign(this.alertModalDefault, modalData);
        this.open(this._alertModal);
    }

    showModal(size?: string) {
        this.open(this._modal, size);
    }

    showLoadingModal() {
        this.open(this._loadingModal);
    }

    hideLoadingModal() {
        this.closeModal(this._loadingModal);
    }
}*/