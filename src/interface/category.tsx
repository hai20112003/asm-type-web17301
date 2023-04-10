export interface ICategory {
    _id: string,
    name: string,
}
export interface IPropsCate{
    onRemoveCate(id: string): unknown,
    category: ICategory[],
}