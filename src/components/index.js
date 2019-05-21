import ConfigAdd from './ConfigAdd.vue';
import ConfigTable from './table/ConfigTable';
import Medicine from './table/Medicine';

import LoginDialog from './LoginDialog';
import ConfigTableSimple from './table/ConfigTableSimple';
import ConfigTableSimpleFilter from './table/ConfigTableSimpleFilter';

//tree
import SimpleTree from './tree/SimpleTree';
import SimpleTreeWithIcon from './tree/SimpleTreeWithIcon';

// uploadfile
import UploadFile from './uploadfile/UploadFile';
import UploadHistory from './uploadfile/UploadHistory';

// 
import OutInDetail from './table/OutInDetail';

import Vue from 'vue';

function registerComponents(){
    
    Vue.component('ConfigAdd', ConfigAdd);
    
    Vue.component('ConfigTable', ConfigTable);
    Vue.component('Medicine', Medicine);
    Vue.component('LoginDialog', LoginDialog);
    Vue.component('ConfigTableSimple', ConfigTableSimple);
    Vue.component('ConfigTableSimpleFilter', ConfigTableSimpleFilter);
    
    //tree
    Vue.component('SimpleTree', SimpleTree);
    Vue.component('SimpleTreeWithIcon', SimpleTreeWithIcon);

    // upload file
    Vue.component('UploadFile', UploadFile);
    Vue.component('UploadHistory', UploadHistory);

    // User
    Vue.component('OutInDetail', OutInDetail);
    
}

export {
    registerComponents
}