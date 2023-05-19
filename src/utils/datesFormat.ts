export const formatDate = (date?: string | undefined | null) => {
    if (date) {
        const format = new Date(date);
        return format.getFullYear() + '-' + (format.getMonth() + 1) + '-' + format.getDate();
    } else {
        return ''
    }
}