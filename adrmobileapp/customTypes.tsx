export type Book = {
  title: string;
  author: string;
  info: string;
  pages: number;
  isbn: string;
  picture_link: string;
  description: string;
};

export type Chapter = {
  chapterNum: number;
  questions: string[];
}
