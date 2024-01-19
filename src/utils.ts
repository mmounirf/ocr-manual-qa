import type { Data, FilesInfo, QaText } from './types';

export function getSortedText(data: Data): FilesInfo[] {
  return data.files_info.sort((a, b) => Number(a.pages[0]) - Number(b.pages[0]));
}

export function getOcrText(filesInfo: FilesInfo[]): QaText[] {
  return filesInfo.map(({ asr_ocr_text, authors, pages, title }) => ({
    text: asr_ocr_text,
    authors,
    pages,
    title,
  }));
}

export function downloadFile(url: string, fileName: string) {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => {
      // Handle error
    });
}
