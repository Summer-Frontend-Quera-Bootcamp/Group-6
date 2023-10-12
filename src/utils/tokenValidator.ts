import jwtDecode from "jwt-decode";

interface IToken {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
}

const isTokenExpired = (token: string) => {
    try {
        const decodedToken: IToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export default isTokenExpired;
