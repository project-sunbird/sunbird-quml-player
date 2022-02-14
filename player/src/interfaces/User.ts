import { EventAudit } from "./EventAudit";
import { Event } from "./Event";

export class User {
  id: string;
  events: Event[];
  eventAudits: EventAudit[];
}
