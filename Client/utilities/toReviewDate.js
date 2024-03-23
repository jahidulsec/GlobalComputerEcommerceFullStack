export const toReviewDate = (date) => {
    if (date) {
        let dates = date.split(`-`)
        return `${dates[2]}/${dates[1]}/${dates[0]}`
    }
}