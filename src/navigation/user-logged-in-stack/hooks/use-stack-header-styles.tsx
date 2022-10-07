import theme, { useTheme } from '@shared/domain/utils/constants/AppTheme';

export default function useStackHeaderStyles() {
    const theme = useTheme();

    return {
        headerTintColor: 'white',
        headerTransparent: true,
        headerTitleStyle: {
            ...headerTitleStyles
        }
    };
}

export const headerTitleStyles = {
    fontFamily: theme.textVariants.navigationHeaderTitle.fontFamily,
    fontSize: theme.textVariants.navigationHeaderTitle.fontSize,
    lineHeight: theme.textVariants.navigationHeaderTitle.lineHeight
};
