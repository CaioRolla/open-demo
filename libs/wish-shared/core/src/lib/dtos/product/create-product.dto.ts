export interface CreateProductDto {
    listId: string;

    name: string;

    desc: string | null;

    url: string | null;

    estimatedPrice: number | null;

    imagesIds: string[] | null;
}