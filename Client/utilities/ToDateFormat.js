export const ToDateFormat = (date) => {
    const newDate = new Date(date)
    return newDate.toDateString()
}