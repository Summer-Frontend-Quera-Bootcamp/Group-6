interface routerType {
    title: string;
    path: string;
    element: JSX.Element;
    isProtected?: boolean;
}

export type { routerType };
