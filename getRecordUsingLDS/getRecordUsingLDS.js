import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const FIELDS = ['Account.Name','Account.Phone','Account.Industry'];

export default class GetRecordUsingLDS extends LightningElement {
    @api recordId;
    isEditable=false;

    @wire(getRecord,{recordId:'$recordId',fields: FIELDS})
    accounts;

    handleEdit(){
        this.isEditable = true;
    }

    handleCancel(){
        this.isEditable = false;
    }   

    handleSuccess(){
        this.isEditable = false;
        this.dispatchEvent(new ShowToastEvent({
            title:'Success',
            message:'Account updated successfully',
            variant:'success'
        })
     );
    }



}