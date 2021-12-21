import DayJS from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

DayJS.extend(RelativeTime);
const _FORMAT_DATE = "YYYY-MM-DD";
const _FORMAT_TIME = "HH:mm";
const _FORMAT = `${_FORMAT_DATE}T${_FORMAT_TIME}`;

const _FORMAT_HUMAN_DOW = "dddd";
const _FORMAT_HUMAN_DATE = "DD/MM/YYYY";
const _FORMAT_HUMAN_TIME = "hh:mm a";
const _FORMAT_HUMAN = `${_FORMAT_HUMAN_DOW}, ${_FORMAT_HUMAN_DATE} @ ${_FORMAT_HUMAN_TIME}`;

// "2000-12-31-01T23:59" -> ("2000-12-31", "23:59")
export const fromTimestamp = (timestamp) => {
    const [date, time] = timestamp.split("T");
    return { date, time };
};

// "2000-12-31-01T23:59" <- ("2000-12-31", "23:59")
export const toTimestamp = (date, time) => {
    return `${date}T${time}`;
};

// "2000-12-31-01T23:59"
export const today = () => {
    return DayJS.format(_FORMAT);
};

// e.g. -2 (2 days ago), 0 (today), +3 (3 days from now)
export const deltaFromToday = (timestamp) => {
    const today = DayJS(DayJS().format(_FORMAT_DATE), _FORMAT_DATE);
    const targetDay = DayJS(fromTimestamp(timestamp).date, _FORMAT_DATE);
    return targetDay.diff(today, "days");
};

// e.g. "2 days ago", "Tomorrow", "3:59 pm"
export const toRelativeTimestamp = (timestamp) => {
    const delta = deltaFromToday(timestamp);

    if (delta > 7) {
        return DayJS(timestamp, _FORMAT).format(_FORMAT_HUMAN_DATE);
    } else if (delta >= 2 && delta <= 7) {
        return `In ${delta} days`;
    } else if (delta === 1) {
        return "Tomorrow";
    } else if (delta === 0) {
        return DayJS(timestamp, _FORMAT).format(_FORMAT_HUMAN_TIME);
    } else if (delta === -1) {
        return "Yesterday";
    } else if (delta <= -2 && delta >= -7) {
        return `${Math.abs(delta)} days ago`;
    } else {
        return DayJS(timestamp, _FORMAT).format(_FORMAT_HUMAN_DATE);
    }
};

// e.g. "Sunday, 31/12/2000 @ 11:59 pm"
export const toHumanReadableTimestamp = (timestamp) => {
    return DayJS(timestamp, _FORMAT).format(_FORMAT_HUMAN);
};
