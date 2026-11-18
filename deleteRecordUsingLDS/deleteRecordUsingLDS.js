import { LightningElement,api } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class DeleteRecordUsingLDS extends LightningElement {
    @api recordId;

    handleDelete(){
        deleteRecord(this.recordId)
        .then(result=>{
            this.dispatchEvent(new ShowToastEvent({
                title:'Account Deleted',
                message:'Account Deleted Successfully',
                variant:'success'
            })

            )
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title:'Error Deleting Account',
                message:error.body.message,
                variant:'error'
            })
            )
        })
    }

}