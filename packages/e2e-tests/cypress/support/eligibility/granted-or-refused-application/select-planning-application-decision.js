import {getGrantedRadio, getRefusedRadio, getNoDecisionReceivedRadio, getPlanningApplicationDecisionError} from '../page-objects/granted-or-refused-application-po'

export const selectPlanningApplicationDecision = (decision)=>{
    switch(decision){
        case 'Granted':
            getGrantedRadio().check();
            break;
        case 'Refused':
            getRefusedRadio().check();
            break;
        case 'I have not received a decision':
            getNoDecisionReceivedRadio().check();
            break;
    }
}
