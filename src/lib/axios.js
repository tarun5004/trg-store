import axios from "axios";

const apiBaseUrl =
    import.meta.env.VITE_API_URL?.trim() || "https://dummyjson.com";

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        const status = error.response?.status;
        const isRateLimited = status === 429;
        const isServerError = status >= 500;

        if (!config || (!isRateLimited && !isServerError)) {
            return Promise.reject(error);
        }

        config._retryCount = config._retryCount ?? 0;

        if (config._retryCount >= MAX_RETRIES) {
            return Promise.reject(error);
        }

        config._retryCount += 1;

        const retryAfterHeader = Number(error.response?.headers?.["retry-after"]);
        const retryDelay = Number.isFinite(retryAfterHeader)
            ? retryAfterHeader * 1000
            : RETRY_DELAY_MS * config._retryCount * (isRateLimited ? 2 : 1);

        await new Promise((resolve) =>
            setTimeout(resolve, retryDelay)
        );

        return axiosInstance(config);
    }
);

export default axiosInstance;
