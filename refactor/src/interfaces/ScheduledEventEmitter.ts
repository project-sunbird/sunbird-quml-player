import { EventEmitter } from "@angular/core";

function scheduleJob(date: Date, callback) {
  const delay = date.getTime() - new Date().getTime();
  return setTimeout(callback, delay);
}

export class ScheduledEventEmitter<T> extends EventEmitter<T> {
  scheduledJobs: any[] = [];
  constructor() {
    super();
    this.scheduledJobs = [];
  }

  /**
   * Schedule an emit of an event at a certain date
   * @param {Object} Event
   * @param {Date} date
   */
  scheduleEmit(event: T, date: Date) {
    const job = scheduleJob(date, () => this.emit(event));
    this.scheduledJobs.push(job);
    return job;
  }

  /**
   * Cancel all scheduled events
   */
  clearSchedule() {
    this.scheduledJobs.forEach((job) => clearTimeout(job));
    this.scheduledJobs.length = 0;
  }
}
