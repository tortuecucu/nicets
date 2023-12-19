export type Article = {
    id: number,
    href: string,
    title: string,
    description: string,
    startAt: any
    endAt: any
    companyId?: number,
    type: string,
    published?: boolean,
}