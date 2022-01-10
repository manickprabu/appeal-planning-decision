import {getIsListedBuilding, getIsNotListedBuilding} from '../../householder-planning/appeals-service/page-objects/householder-planning-listed-building-po'

export const selectListedBuildingDecision = (decision)=>{
    switch(decision){
        case 'Yes':
            getIsListedBuilding().check();
            break;
        case 'No':
            getIsNotListedBuilding().check();
            break;
    }
}
