'use strict';
import exampleUser from './exampleUser.json';
import exampleScheduleRaw from './exampleScheduleRaw.json';
import exampleSchedule from './exampleSchedule.json';

/**
 * FakeBackend class
 *
 * @class FakeBackend
 */
export default class FakeBackend {
  static IS_ACTIVE = false;

  static getRawExampleUser() {
    return exampleUser;
  }

  static getMainentanceError() {
    return {
      data: '<!DOCTYPE html>\nStud.IP ist zur Zeit wegen Wartungsarbeiten nicht verf&uuml;gbar\\',
    };
  }

  static getRawExampleSchedule() {
    return exampleScheduleRaw;
  }

  static getParsedExampleSchedule() {
    return exampleSchedule;
  }
}
