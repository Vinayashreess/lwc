import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateRecordUsingLDS extends LightningElement {
    accName='';
    phone='';
    industry='';

    handleChange(e){
        if(e.target.name == 'accName'){
            this.accName = e.target.value;
        }
        else if(e.target.name == 'phone'){
            this.phone = e.target.value;
        }
        else if(e.target.name == 'industry'){
            this.industry = e.target.value;
        }
    }

    handleCreateAccount(){
        const fields={
            Name : this.accName,
            Phone : this.phone,
            Industry : this.industry
        }

        const recordInput={
            apiName : 'Account',
            fields : fields
        }

        createRecord(recordInput)
        .then(result=>{
            this.dispatchEvent(new ShowToastEvent({
                title : 'Success',
                message : 'Account created successfully' + result.id,
                variant : 'success'
            })
            )
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title : 'Error creating record',
                message : error.body.message,
                variant : 'error'
            }))
        })
    }
}