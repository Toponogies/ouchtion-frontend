import DayJS from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import {
    DELTA_THRESHOLD_START_SHOW_BADGE,
    DELTA_THRESHOLD_END_SHOW_DAYS,
    DELTA_THRESHOLD_END_SHOW_TIME,
} from "@/utils/constants";

DayJS.extend(RelativeTime);
const _FORMAT_DATE = "YYYY-MM-DD";
const _FORMAT_TIME = "HH:mm:ss.SSS";
const _FORMAT_DELIMITER = "T";
const _FORMAT = `${_FORMAT_DATE}${_FORMAT_DELIMITER}${_FORMAT_TIME}Z`;

const _FORMAT_LONG = "DD/MM/YYYY hh:mm:ss a";
const _FORMAT_SHORT = "DD/MM/YYYY";

export const fromTimestamp = (timestamp) => {
    // split by middle T
    let [date, time] = timestamp.split(_FORMAT_DELIMITER);
    // remove miliseconds + "Z" at the end of time
    time = time.substring(0, 8);
    return { date, time };
};

export const toTimestamp = (date, time) => {
    return `${date}${_FORMAT_DELIMITER}${time}.000Z`;
};

export const today = () => {
    return DayJS.format(_FORMAT);
};

// delta in seconds
export const deltaFromToday = (timestamp) => {
    const today = DayJS();
    const targetDay = DayJS(timestamp, _FORMAT);
    return targetDay.diff(today, "second");
};

export const isNewProduct = (startTime) => {
    const delta = -1 * deltaFromToday(startTime);
    return delta < DELTA_THRESHOLD_START_SHOW_BADGE;
};

export const isInCountdownThreshold = (endTime) => {
    const delta = deltaFromToday(endTime);
    return delta < DELTA_THRESHOLD_END_SHOW_TIME;
};

export const toRelativeTimestamp = (endTime) => {
    const delta = deltaFromToday(endTime);

    if (delta > DELTA_THRESHOLD_END_SHOW_DAYS) {
        return DayJS(endTime, _FORMAT).format(_FORMAT_SHORT);
    } else if (delta >= DELTA_THRESHOLD_END_SHOW_TIME && delta <= DELTA_THRESHOLD_END_SHOW_DAYS) {
        return `${Math.floor(delta / 86400) + 1} days`;
    } else if (delta > 0) {
        // https://stackoverflow.com/a/25279340
        return new Date(delta * 1000).toISOString().substring(11, 19);
    } else {
        return "00:00:00";
    }
};

export const toLongTimestamp = (timestamp) => {
    return DayJS(timestamp, _FORMAT).format(_FORMAT_LONG);
};
