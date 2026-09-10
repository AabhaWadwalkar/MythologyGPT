export interface GraphNode{
    id: string
}

export interface GraphLink{
    source: string,
    relation: string,
    target: string
}

export interface GraphResponse{
    response: {
        nodes: GraphNode[],
        links: GraphLink[]
    }
}