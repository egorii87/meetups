export interface News {
  id: string;
  publicationDate: string; // Date string
  title: string;
  text: string;
  image?: File;
}

export type NewNews = Omit<News, 'id' | 'publicationDate'>;
