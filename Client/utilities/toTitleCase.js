export const toTitleCase = (string) => {
    let word = ''
    try{
        let words = string.split("-")
        for (let item of words) {
            word = word + ' '+ item[0].toUpperCase()+item.slice(1) 
        }
        return word

    }
    catch {
        console.log('not a string type')
    }
}