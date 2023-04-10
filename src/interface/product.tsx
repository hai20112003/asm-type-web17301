export interface IProduct {
    _id: string,
    name: string,
    price: number,
    image: string,
    description: string,
    categoryId: number | string,
}
export interface IProps{
    onRemove(id: string): unknown;
    products: IProduct[]
}

export interface IId{
    id: string,
}

export interface Props {
    products: IProduct[];
}
