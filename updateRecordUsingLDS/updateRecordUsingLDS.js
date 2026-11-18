import { LightningElement,api } from 'lwc';
import {updateRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UpdateRecordUsingLDS extends LightningElement {
    @api recordId;
    accName ='';
    phone='';
    
    handleChange(e){
        if(e.target.name == 'accName'){
            this.accName=e.target.value;
        }
        if(e.target.name == 'phone'){
            this.phone=e.target.value;
        }       

    }

    handleUpdate(){

        updateRecord({
            recordInput: {
                recordId :'$recordId',
                fields: {
                    Name: this.accName,
                    Phone: this.phone
                }
            }
        })
        .then(result=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Account Updated',
                    message:'Account Updated Successfully'+ result.id,
                    variant:'success'
                })

            )
        })
        .catch(error=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Error Updating Account',
                    message:error.body.message,
                    variant:'error'
                })
            )
        })
    }
}