import { LightningElement,wire } from 'lwc';
import LOGO from '@salesforce/resourceUrl/trailhead_logo';
import CONTENT_ASSET from '@salesforce/contentAssetUrl/wallpaper_png';
import GREETING from '@salesforce/label/c.greetings';
import SALESFORCE_PLATFORM from '@salesforce/label/c.SalesforcePlatform';
import USER_ID from '@salesforce/user/Id';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import DISPLAY_TEXT from '@salesforce/customPermission/displayText';
import {loadScript,loadStyle} from 'lightning/platformResourceLoader';
import ANIMATE from '@salesforce/resourceUrl/ThirdPartyCSS';
import MOMENT from '@salesforce/resourceUrl/ThirdPartyJS';


export default class StaticResourceDemo extends LightningElement {
    TrailheadLogo = LOGO;
    ContentAsset = CONTENT_ASSET;
    label = {
        greeting : GREETING,
        salesforceplatform : SALESFORCE_PLATFORM
    };
    name = "";
    isFirstRender = true;
    date='';

    @wire(getRecord,{recordId : USER_ID,fields : [NAME_FIELD]})
    wiredUserRec({data,error}){
        if(data){
            console.log('User data',data);
            this.name = getFieldValue(data,NAME_FIELD);
        }
        else if(error){
            console.error('Error fetching user data',error);
        }
    }
    get checkPermission(){
        return DISPLAY_TEXT;
    }

    renderedCallback() {
        if (this.isFirstRender) {
            this.isFirstRender = false;
            Promise.all([loadStyle(this, ANIMATE), loadScript(this, MOMENT)])
            
                .then(() => {
                    this.fetchData();
                    console.log('Third party resources loaded successfully');
                })
                .catch(error => {
                    console.error('Error loading third party resources:', error);
                });
        }
    }
    fetchData(){
        this.date = window.moment().subtract(6, 'days').calendar();
        console.log('Date from moment.js:', this.date);
    }

}