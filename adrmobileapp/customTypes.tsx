export type Book = {
  title: string;
  author: string;
  info: string;
  pages: number;
  isbn: string;
  picture_link: string;
  description: string;
  bookId: string;
};

export type Chapter = {
  answers: string[];
  chapterNum: number;
  questions: string[];
}
