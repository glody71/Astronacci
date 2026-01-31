export interface Content {
  id: number;
  title: string;
  type: "article" | "video";
  body?:string;
  url?:string
  thumbnail_url: string;
}
