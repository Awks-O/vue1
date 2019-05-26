import ConfigAdd from './ConfigAdd.vue';
import Medicine from './table/Medicine';

import LoginDialog from './LoginDialog';

//tree
import SimpleTree from './tree/SimpleTree';
import SimpleTreeWithIcon from './tree/SimpleTreeWithIcon';

// uploadfile
import UploadFile from './uploadfile/UploadFile';
import UploadHistory from './uploadfile/UploadHistory';

// 
import OutInfo from './table/OutInfo';
import InInfo from './table/InInfo';

import Vue from 'vue';

function registerComponents(){
    
    Vue.component('ConfigAdd', ConfigAdd);
    
    Vue.component('Medicine', Medicine);
    Vue.component('LoginDialog', LoginDialog);
    
    //tree
    Vue.component('SimpleTree', SimpleTree);
    Vue.component('SimpleTreeWithIcon', SimpleTreeWithIcon);

    // upload file
    Vue.component('UploadFile', UploadFile);
    Vue.component('UploadHistory', UploadHistory);

    // User
    Vue.component('OutInfo', OutInfo);
    Vue.component('InInfo', InInfo);
    
}

export {
    registerComponents
}