// Validointia varten metodi joka tarkastaa onko kaikki objektin arvot täytetty
export function validateCustomerData(object: Object):boolean {
    return Object.values(object).every((value) => value.trim() !== "");
}