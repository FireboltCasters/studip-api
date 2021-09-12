export default class Base64Helper {

  static toBase64(string: string){
    let buff = Buffer.from(string);
    return buff.toString('base64');
  }

  static fromBase64(string: string){
    let buff = Buffer.from(string, 'base64');
    return buff.toString('ascii');
  }

}
