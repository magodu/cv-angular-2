import { Component, ViewChild, EventEmitter} from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'my-modal-component',
    templateUrl: 'templates/modals.tpl.html',
    directives: [MODAL_DIRECTIVES],
    outputs: ['modalOutput']
})
export class ModalsComponent {

    @ViewChild('modal') _modal: ModalComponent;                //'_modal' is the identifier #modal in the template
	@ViewChild('alertModal') _alertModal: ModalComponent;      //'_alertModal' is the identifier #alertModal in the template
    @ViewChild('loadingModal') _loadingModal: ModalComponent;  //'_loadingModal' is the identifier #loadingModal in the template

    modalOutput = new EventEmitter<string>();
    output: string;

    animation: boolean = true;
    keyboard: boolean = false;
    backdrop: string | boolean = 'static';

    alertModalDefault: Object = {
		type: 'danger',
		title: 'Error',
		bodyText: ''
	};

    closed() {
        this.output = '(closed)';
        this.modalOutput.emit(this.output);
    }

    dismissed() {
        this.output = '(dismissed)';
        this.modalOutput.emit(this.output);
    }

    opened() {
        this.output = '(opened)';
        this.modalOutput.emit(this.output);
    }

    closeModal(modal: ModalComponent) {
        modal.close();
    }

    private dismiss(modal: ModalComponent) {
		modal.instance.visible = true;
        modal.dismiss();
    }

    private open(modal: ModalComponent, size?: string) {
		size ? modal.open(size) : modal.open();
    }

    dismissModal(modal: ModalComponent) {
        this.dismiss(modal);
    }

    showAlertModal(modalData: Object) {
		this.alertModalDefault = modalData;
        this.open(this._alertModal);
    }

    showModal(size?: string) {
        this.open(this._modal, size);
    }

    hideLoadingModal() {
        this.dismiss(this._loadingModal);
    }

    showLoadingModal() {
        this.open(this._loadingModal);
    }
}