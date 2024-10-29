import { KeyEventsClick } from '../hooks/useClickGTM/type';
import { KeyEventsMessage } from '../hooks/useEventMsgGTM/helper/type';
import { KeyMessage, MapMessage } from '../typings/message';

export interface EventGroup {
	event: KeyEventsMessage | KeyEventsClick;
	items: Array<MapMessage[KeyMessage.modalData]['data']>;
}

interface PageGroup {
	page_type: string;
	events: EventGroup[];
}

type GroupedEvents = PageGroup[];

export const groupByPageTypeAndEvent = (events: Array<MapMessage[KeyMessage.modalData]['data']>): GroupedEvents => {
	const groupedEvents: GroupedEvents = [];
	let currentGroup: PageGroup | null = null;

	events.forEach((event, index) => {
		if (!currentGroup || event.page_type !== currentGroup.page_type) {
			if (currentGroup) {
				groupedEvents.push(currentGroup);
			}

			currentGroup = {
				page_type: event.page_type,
				events: [],
			};
		}

		let eventGroup = currentGroup.events.find(e => e.event === event.event);

		if (!eventGroup) {
			eventGroup = {
				event: event.event,
				items: [],
			};
			currentGroup.events.push(eventGroup);
		}

		eventGroup.items.push(event);

		if (index === events.length - 1 && currentGroup) {
			groupedEvents.push(currentGroup);
		}
	});

	return groupedEvents;
};
