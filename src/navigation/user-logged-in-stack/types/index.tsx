import { StackNavigationProp } from '@react-navigation/stack';

type NavTitle = {
    title?: string;
};

export type StackRouteParams = {
    Dashboard: undefined;
    Profile: NavTitle;
    Notifications: NavTitle;
    UserMenu: NavTitle;
};

export type LoggedInStackNavigationProp = StackNavigationProp<StackRouteParams>;
