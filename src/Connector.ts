import Base64Helper from "./Base64Helper";
import UrlHelper from "./UrlHelper";
import User from "./models/User";
import ScheduleLoader from "./ScheduleLoader";
import FetchHelper from "./ignoreCoverage/FetchHelper";

export default class Connector {
  private readonly username: string;
  private readonly password: string;
  // @ts-ignore //since we can only the the client when user is found, it cant be undefined
  private user: User;

  private constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  static async getClient(studIpDomain: string, username: string, password: string): Promise<Connector>{
    if(!(UrlHelper.STUDIP_DOMAIN)){
      UrlHelper.STUDIP_DOMAIN = studIpDomain;
    }
    const client = new Connector(username, password);
    await client.login();
    return client;
  }

  getUser(): User{
    return this.user;
  }

  private async login(){
    this.user = await this.loadUser();
  }

  async loadUserRaw(): Promise<any>{
    const url = UrlHelper.getUserURL();
    const headers = this.getHeaders();
    let answer = await FetchHelper.getUser(url, headers);
    return answer.data;
  }

  private async loadUser(): Promise<User>{
    const data = await this.loadUserRaw();
    return new User(data);
  }

  getHeaders(){
    let token: string = Base64Helper.toBase64(this.username + ":" + this.password);
    return {
      'Content-Type': 'text/json',
      Authorization: 'Basic ' + token //the token is a variable which holds the token
    }
  }

  async loadScheduleRaw(): Promise<any>{
    const user = this.getUser();
    const url = UrlHelper.getScheduleURL(user.user_id);
    const headers = this.getHeaders();
    let answer = await FetchHelper.getScheduleRaw(url, headers);
    return answer.data;
  }

  async loadSchedule(){
    let data = await this.loadScheduleRaw();
    return ScheduleLoader.parseStudIPEventstoTimetableEvents(data);
  }
}
