interface routerType {
    title: string;
    path: string;
    element: JSX.Element;
    isProtected?: boolean;
    isAuth?: boolean;
}

export type { routerType };
