import {getGrantedRadio, getRefusedRadio, getNoDecisionReceivedRadio
} from '../page-objects/granted-or-refused-application-po'

export const selectPlanningApplicationDecision = (decision)=>{
  console.log('aaaaaaa '+decision)
    switch(decision){
        case 'Granted':
            getGrantedRadio().check();
            break;
        case 'Refused':
            getRefusedRadio().check();
            break;
        case 'I have Not Received a Decision':
            getNoDecisionReceivedRadio().check();
            break;
    }
}
