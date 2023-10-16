import axios from "axios";

export const BaseApiUrl = {
    dev: "https://quera.iran.liara.run",
    prod: "https://quera.iran.liara.run",
};

export const AXIOS = axios.create({
    baseURL: BaseApiUrl.dev,
    headers: { "Content-Type": "application/json" },
});
