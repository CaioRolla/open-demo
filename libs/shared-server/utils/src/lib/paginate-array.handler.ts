export const paginateArrayHandler = <T>(data: T[], skip: number, take: number) => {
    return take === -1 ? data : data.slice(skip, skip + take);
}