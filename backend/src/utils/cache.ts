import { RatedBook } from "../types/types";

const cache = new Map<string, { value: RatedBook[]; expiresAt: number }>();

export const getCached = (key: string): RatedBook[] | null => {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
        cache.delete(key);
        return null;
    }
    return entry.value;
};

export const setCached = (key: string, value: RatedBook[], ttlMs: number) => {
    cache.set(key, {
        value,
        expiresAt: Date.now() + ttlMs,
    });
};
