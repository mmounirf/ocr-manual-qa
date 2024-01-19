export interface Data {
  cover_name: string | null;
  document_date_utc: string;
  document_id: string;
  edition_number: string;
  pdf_file: string;
  files_info: FilesInfo[];
  document_type_en: string;
  media_type_en: string;
  pages: Page[];
  provider_id: string;
  provider_name_ar: string;
  provider_name_en: string;
  publish_country_ar: string;
  publish_country_en: string;
  source_format_ar: string;
  source_format_en: string;
  source_language_name_ar: string;
  source_language_name_en: string;
  source_name: string;
  source_name_norm_ar: string;
  source_nationality_ar: string;
  source_nationality_en: string;
  source_periodicity_release_ar: string;
  source_periodicity_release_en: string;
  transaction_id: string;
  version: Version;
  document_title: string | null;
  author: string[] | null;
  preview: Preview[];
  issue_date: string;
}

export interface FilesInfo {
  asr_ocr_text: string;
  article_coordinates: string[][];
  pages: string[];
  image_name: string;
  lines: Line[];
  authors: string[];
  title: string;
}

export interface Line {
  'line number': string;
  line_coordinates: LineCoordinates;
  line_text: string;
}

export interface LineCoordinates {
  top_left: string[];
  top_right: string[];
  bottom_right: string[];
  bottom_left: string[];
}

export interface Page {
  image_name: string;
  page_number: number;
  thumbnail_name: string;
  preview_name: string;
}

export interface Version {
  major: string;
  minor: string;
}

export interface Preview {
  preview_name: string;
}

export interface QaText {
  text: string;
  authors: Array<string>;
  pages: Array<string>;
  title: string;
}
