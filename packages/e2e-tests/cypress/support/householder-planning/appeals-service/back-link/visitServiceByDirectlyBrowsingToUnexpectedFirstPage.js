import { goToAppealsPage } from '../go-to-page/goToAppealsPage';
import { pageURLAppeal } from '../../../../integration/common/householder-planning/appeals-service/pageURLAppeal';

export const visitServiceByDirectlyBrowsingToUnexpectedFirstPage = () => {
  goToAppealsPage(pageURLAppeal.goToSiteAddressPage);
};
