export interface Article{
    source: Source,
    author?: string,
    title:string,
    description?:string,
    url?: URL,
    urlToImage?: URL,
    publishedAt?: string,
    content?: string

};

export interface Articles{
    status: string,
    totalResults: number,
    articles: Article[]

};

export interface Source{
    id?:string,
    name?:string
}
export interface Sources{
    status: string,
    sources:Source[]
}