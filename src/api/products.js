import axiosInstance from "@/lib/axios";

const CACHE_TTL_MS = 1000 * 60 * 5;
const responseCache = new Map();
const inflightRequests = new Map();

const getCachedValue = (key) => {
    const cached = responseCache.get(key);

    if (!cached) {
        return null;
    }

    if (Date.now() > cached.expiresAt) {
        responseCache.delete(key);
        return null;
    }

    return cached.value;
};

const setCachedValue = (key, value) => {
    responseCache.set(key, {
        value,
        expiresAt: Date.now() + CACHE_TTL_MS,
    });
    return value;
};

const cachedGet = async (url, selectData = (data) => data) => {
    const cachedValue = getCachedValue(url);

    if (cachedValue) {
        return cachedValue;
    }

    if (inflightRequests.has(url)) {
        return inflightRequests.get(url);
    }

    const request = axiosInstance
        .get(url)
        .then((res) => setCachedValue(url, selectData(res.data)))
        .finally(() => {
            inflightRequests.delete(url);
        });

    inflightRequests.set(url, request);
    return request;
};

export const getAllProducts = async () => {
    try {
        return await cachedGet(
            "/products?limit=0&skip=77",
            (data) => data.products
        );
    } catch (error) {
        throw new Error("Failed to fetch products", { cause: error });
    }
};

export const getLimitedProducts = async ({ limit = 10, skip = 77 } = {}) => {
    try {
        return await cachedGet(
            `/products?limit=${limit}&skip=${skip}`,
            (data) => data.products
        );
    } catch (error) {
        throw new Error("Failed to fetch limited products", { cause: error });
    }
};

export const getTrendingProducts = async ({ limit = 10, skip = 77 } = {}) => {
    try {
        return await cachedGet(
            `/products?limit=${limit}&skip=${skip}`,
            (data) => data.products
        );
    } catch (error) {
        throw new Error("Failed to fetch trending products", { cause: error });
    }
};

export const getProductById = async (id) => {
    try {
        return await cachedGet(`/products/${id}`);
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${id}`, {
            cause: error,
        });
    }
};

export const searchProducts = async (query) => {
    try {
        const res = await axiosInstance.get(
            `/products/search?q=${encodeURIComponent(query)}`
        );
        return res.data.products;
    } catch (error) {
        throw new Error(`Failed to search products with query "${query}"`, {
            cause: error,
        });
    }
};

export const getProductsCategories = async () => {
    try {
        return await cachedGet("/products/categories", (data) =>
            Array.isArray(data) ? data : []
        );
    } catch (error) {
        throw new Error("Failed to fetch product categories", { cause: error });
    }
};

export const getProductsByCategory = async (category) => {
    try {
        return await cachedGet(
            `/products/category/${category}`,
            (data) => data.products
        );
    } catch (error) {
        throw new Error(`Failed to fetch products for category "${category}"`, {
            cause: error,
        });
    }
};
