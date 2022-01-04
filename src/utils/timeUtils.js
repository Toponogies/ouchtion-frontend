import DayJS from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import {
    DELTA_THRESHOLD_START_SHOW_BADGE,
    DELTA_THRESHOLD_END_SHOW_DAYS,
    DELTA_THRESHOLD_END_SHOW_TIME,
} from "@/utils/constants";

DayJS.extend(RelativeTime);
const _FORMAT_DATE = "YYYY-MM-DD";
const _FORMAT_TIME = "HH:mm:ss";
const _FORMAT_DELIMITER = " ";
const _FORMAT = `${_FORMAT_DATE}${_FORMAT_DELIMITER}${_FORMAT_TIME}`;

const _FORMAT_LONG = "DD/MM/YYYY hh:mm:ss a";
const _FORMAT_SHORT = "DD/MM/YYYY";
// const _FORMAT_COUNTDOWN_TIME = "HH:mm:ss";

// "2000-12-31-01 23:59:59" -> ("2000-12-31", "23:59:59")
export const fromTimestamp = (timestamp) => {
    const [date, time] = timestamp.split(_FORMAT_DELIMITER);
    return { date, time };
};

// "2000-12-31-01 23:59:59" <- ("2000-12-31", "23:59:59")
export const toTimestamp = (date, time) => {
    return `${date}${_FORMAT_DELIMITER}${time}`;
};

// "2000-12-31-01 23:59:59"
export const today = () => {
    return DayJS.format(_FORMAT);
};

// delta in seconds
export const deltaFromToday = (timestamp) => {
    // const today = DayJS(DayJS().format(_FORMAT_DATE), _FORMAT_DATE);
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
