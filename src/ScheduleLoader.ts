import ScheduleEvent from './models/ScheduleEvent';

export default class ScheduleLoader {
  static parseStudIPEventstoTimetableEvents(data: any): ScheduleEvent[] {
    let events: ScheduleEvent[] = [];
    const weekdays = 7;
    for (let weekdayIndex = 0; weekdayIndex < weekdays; weekdayIndex++) {
      const dataForWeekday = data[weekdayIndex];
      for (const index in dataForWeekday) {
        const rawEventAtWeekday = dataForWeekday[index];
        let event = ScheduleLoader.parseRawEventToScheduleEvent(
          weekdayIndex,
          rawEventAtWeekday
        );
        events.push(event);
      }
    }
    return events;
  }

  static parseRawEventToScheduleEvent(
    weekdayIndex: number,
    rawEventAtWeekday: any
  ): ScheduleEvent {
    let buildingAndRoom = ScheduleLoader.filterStudIPBuilding(
      rawEventAtWeekday.title
    );
    let eventJson = {
      name: ScheduleLoader.filterNameFromEventContent(
        rawEventAtWeekday.content
      ),
      location: rawEventAtWeekday.title,
      building: buildingAndRoom.building,
      room: buildingAndRoom.room,
      start: ScheduleLoader.getTimeFromStudIPTime(rawEventAtWeekday.start),
      end: ScheduleLoader.getTimeFromStudIPTime(rawEventAtWeekday.end),
      weekday: weekdayIndex,
      color: rawEventAtWeekday.color,
    };
    return new ScheduleEvent(eventJson);
  }

  static filterNameFromEventContent(content: string): string {
    return content.replace(/\d+(\.)\d+/g, '').trim();
  }

  /**
   * filters the building and room from the title given by StudIP
   * @param {String} eventTitle
   */
  static filterStudIPBuilding(eventTitle: string): any {
    let title = eventTitle;
    let regBuildingRoom =
      /(\w{1,2})\s?\/\s?([E,B,\d]\d{2})|(\w{1,2})\s([E,B,\d]\d{2})/g;

    let buildingAndRoom = title.match(regBuildingRoom);

    let building = '';
    let room = '';

    if (!!buildingAndRoom && buildingAndRoom.length > 0) {
      let buildingAndRoomMatch = buildingAndRoom[0];

      let regBuilding = /(\w{1,2}(?=[\s?\/,\s?]))/g;
      let buildingMatches = buildingAndRoomMatch.match(regBuilding);
      /* istanbul ignore else */ //we ignore the else case since its covered already by building=""
      if (!!buildingMatches && buildingMatches.length > 0) {
        building = buildingMatches[0];
      }

      let regRoom = /([E,B,\d]\d{2})/g;
      let roomMatches = buildingAndRoomMatch.match(regRoom);

      /* istanbul ignore else */ //we ignore the else case since its covered already by room=""
      if (!!roomMatches && roomMatches.length > 0) {
        room = roomMatches[0];
      }
    }
    return {building: building, room: room};
  }

  static getTimeFromStudIPTime(studIPTime: number): string {
    let hour: string = '' + Math.floor(studIPTime / 100);
    hour = ScheduleLoader.padTime(hour);
    let minutes: string = '' + (studIPTime % 100);
    minutes = ScheduleLoader.padTime(minutes);
    return hour + ':' + minutes;
  }

  static padTime(hourOrMinutes: string): string {
    return hourOrMinutes.padStart(2, '0'); // "9" --> "09" --> this will result in time formats for "09:07"
  }
}
