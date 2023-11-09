import { Image } from "./image.type";

export interface Event {
    id: number;
    type: string;
    name: string;
    test: boolean;
    locale: string;
    images: Array<Image>;
    dates: Object;
    sales: Object;
    url: string;
}