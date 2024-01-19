export enum ArticleStatus {
  Pending = 'pending',
  Misclassified = 'misclassified',
  Reviewed = 'reviewed',
  Rework = 'rework',
  Generated = 'generated',
}

export type InvalidationError = {
  detail: {
    msg: string;
    type: string;
  }[];
};

export type GenericError = {
  detail: {
    errors: {
      message: string;
    }[];
  }[];
};

export type QueryParams = {
  page: number;
  size: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  next_page: string;
  page_size: number;
};

export type Entity = {
  text: string;
  type: string;
};

export type PageDetails = {
  document: string;
  updated_on: string;
  thumbnail_name: string;
  updated_by: any;
  last_err: string;
  created_by: any;
  page_number: number;
  id: string;
  processed: string;
  created_on: string;
  preview_name: string;
  image_name: string;
  original: string;
  status: ArticleStatus;
};

export type Article = {
  id: string;
  page: string;
  page__details: PageDetails;
  text: string;
  text_words: {
    title: string;
  };
  post_text: string;
  entities: { entities: Entity[] };
  file_info: {
    article_coordinates: [string[]];
    asr_ocr_text: string;
    authors: [];
    image_name: string;
    lines: any;
    pages: string[];
    title: string;
  };
  labels: string[];
  image_url: string;
  created_by: any;
  updated_by: any;
  created_on: string;
  updated_on: string;
  status: ArticleStatus;
  date: string;
  authors: string[];
};

export type ArticlesResponse = PaginatedResponse<Article>;

export type Document = {
  id: string;
  source: string;
  type: string;
  date: string;
  status: ArticleStatus;
  pages: PageDetails[];
  cover_name: string;
  author: string;
  document_title: string;
  created_by: string;
  updated_by: string;
  created_on: string;
  updated_on: string;
};

export type DocumentsResponse = PaginatedResponse<Document>;

export type Page = {
  id: string;
  document: string;
  document__details: Omit<Document, 'pages'>;
  page_number: number;
  status: ArticleStatus;
  last_err: string;
  original: string;
  processed: string;
  articles: Article[];
  image_name: string;
  thumbnail_name: string;
  preview_name: string;
  created_by: string;
  updated_by: string;
  created_on: string;
  updated_on: string;
};

export type PagesResponse = PaginatedResponse<Page>;

export type FilterParams = {
  date: string;
  status: ArticleStatus;
};

export type FilterArticlesQuery = {
  filter: Partial<FilterParams>;
};

export type FirebaseArticle = {
  asr_ocr_text: string;
  authors: string[];
  date: string;
  id: string;
  image_url: string;
  modified_by_qa_authors: string[];
  modified_by_qa_content: string;
  modified_by_qa_status: string;
  modified_by_qa_title: string;
  page: string;
  post_text: string;
  status: string;
  text: string;
  text_words: { title: string };
};
