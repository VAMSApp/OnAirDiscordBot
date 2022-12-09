export type QueryOptionsInclude = {
    [key: string]: QueryOptionsInclude | boolean
}

export type QueryOptions = {
    include?: QueryOptionsInclude;
    omit?: string[];
    serialize?: boolean;
    humanize?: string[];
    orderBy?: string[];
}
