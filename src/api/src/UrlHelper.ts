export default class UrlHelper {
  static STUDIP_DOMAIN_UNI_OSNABRUECK = 'https://studip.uni-osnabrueck.de';
  static STUDIP_DOMAIN = '';
  static STUDIP_PATH_USER = '/api.php/user/';
  static STUDIP_PATH_SCHEDULE = '/schedule';

  // https://hilfe.studip.de/develop/Entwickler/RESTAPI
  static getUserURL(): string {
    return UrlHelper.STUDIP_DOMAIN + UrlHelper.STUDIP_PATH_USER;
  }

  static getScheduleURL(user_id: string): string {
    return UrlHelper.getUserURL() + user_id + UrlHelper.STUDIP_PATH_SCHEDULE;
  }
}
