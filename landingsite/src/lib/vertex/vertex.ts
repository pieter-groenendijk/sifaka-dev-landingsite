export interface Vertex {
    X: number;
    Y: number;
}

export function CreateVertex(x: number, y: number): Vertex {
    const v = Object.create(null);

    v.X = x;
    v.Y = y;

    return v;
}