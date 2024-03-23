export const currencyFormat = (number) => {
    return `৳ ${new Intl.NumberFormat("en-IN").format(number)}`
}