import { TagTypes } from "@/types/newTask.types";
import axios, { AxiosResponse } from "axios";

const BIN_ID = "651d35ad12a5d376598705c9";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const API_KEY = "$2a$10$0VS5QTDavHJkKI7KwrjNIeV75O5qfw4R4sK8t5A/GK2ehhTbx2wne";

export async function updateTags(newTags: TagTypes[]): Promise<void> {
    //* جایگزین میکند API تگ های جدید را در
    try {
        await axios.put(API_URL, newTags, {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
            },
        });
    } catch (error: any) {
        if (error.response) {
            console.error(`Error updating tags: ${error.response.data}`);
        } else {
            console.error("Error updating tags:", error.message);
        }
    }
}

export async function getTags() {
    //* دریافت و برمی گرداند API لیست تگ ها را از
    try {
        const response: AxiosResponse = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key":
                    "$2a$10$0VS5QTDavHJkKI7KwrjNIeV75O5qfw4R4sK8t5A/GK2ehhTbx2wne",
            },
        });
        const allData = response.data;
        return allData;
    } catch (error) {
        throw error;
    }
}
