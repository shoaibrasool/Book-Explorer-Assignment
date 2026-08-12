
export const sanitizeAuthor = (author: string): string => {
    const match = author.match(/\(([^)]+)\)/);
    if (match?.[1]) return match[1].trim();
    return author.replace(/[^\w\s]/gi, "").trim();
};