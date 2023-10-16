import Cookies from "js-cookie";

export const getUserIDFromCookies = (): number => {
    const user = Cookies.get("user") || "";
    let user_id = 0;

    if (user) {
        try {
            const userObject = JSON.parse(user);
            if (userObject.id !== undefined) {
                user_id = userObject.id;
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            user_id = 0;
        }
    }

    if (user_id === 0 || !user_id) {
        throw new Error("User ID not found in cookies");
    }

    return user_id;
};
