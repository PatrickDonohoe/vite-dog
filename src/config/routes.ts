import { FC } from 'react';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import TWSearch from '../pages/TWSearch';

interface RouteType {
    path: string,
    component: FC<{}> | (() => JSX.Element),
    name: string
    protected: boolean
}

const routes: RouteType[] = [
    {
        path: "",
        component: Home,
        name: "Home Screen",
        protected: false,
    },
    {
        path: "/favorites",
        component: Favorites,
        name: "Favorites",
        protected: true,
    },
    {
        path: "/twsearch",
        component: TWSearch,
        name: "TWSearch",
        protected: true,
    }
];

export default routes;