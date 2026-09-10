export interface Relationship{
    parents: string[],
    spouse: string[],
    children: string[],
}

export interface God{
    name: string,
    category: string,
    role: string,
    powers: string[],
    symbols: string[],
    relationships: Relationship,
    description: string,
    stories: string[],
    sources: string[],
}