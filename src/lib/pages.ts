export function getPages(currentPage: number, totalPages: number, size: number = 3) {
  const page = Math.max(1, Math.min(currentPage, totalPages));

  let start = page - Math.floor(size / 2);
  let end = start + size - 1;

  if (start < 1) {
    start = 1;
    end = Math.min(totalPages, start + size - 1);
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - size + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
