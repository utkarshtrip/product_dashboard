export const countVisits = (visitDates, targetDate, low, high) => {
    if (low > high) {
        return visitDates.length - low;
    }

    const mid = Math.floor((low + high) / 2);

    if (visitDates[mid] >= targetDate) {
        return countVisits(visitDates, targetDate, low, mid - 1);
    } else {
        return countVisits(visitDates, targetDate, mid + 1, high);
    }
};