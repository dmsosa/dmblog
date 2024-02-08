export function dateFormatter(date:Date): string {
    return new Date(date).toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}