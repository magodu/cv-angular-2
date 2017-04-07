import { Component, ViewChild, EventEmitter, ViewEncapsulation} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ResumeService } from '../resume-cv/resume.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'modals-component',
    templateUrl: 'modals.component.html',
    styleUrls: ['modals.component.scss'],
    outputs: ['modalOutput']
})
export class ModalsComponent {

    @ViewChild('contactModal') public _contactModal: ModalComponent;    //'_contactModal' is the identifier #contactModal in the template
    @ViewChild('alertModal')   public _alertModal: ModalComponent;      //'_alertModal' is the identifier #alertModal in the template
    @ViewChild('loadingModal') public _loadingModal: ModalComponent;    //'_loadingModal' is the identifier #loadingModal in the template

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

    modalDefault: Object = {
        title: 'Modal example',
        bodyText: 'Select one:'
    };

    selectedItem: any;

    constructor(private _resumeService: ResumeService,  private _translate: TranslateService) {}

    resetForm() {
        this._resumeService.resetContactFormEvent(false);
    }


    onClose() {
        this.output = this.selectedItem;
        this.modalOutput.emit(this.output);
    }

    onDismiss() {
        this.output = '(dismissed)';
        this.modalOutput.emit(this.output);
    }

    onOpen() {
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

    showModal(modal: string, size?: string) { 
        this.open(this._contactModal, size);
    }

    hideLoadingModal() {
        this.dismiss(this._loadingModal);
    }

    showLoadingModal() {
        this.open(this._loadingModal);
    }

}