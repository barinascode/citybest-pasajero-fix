import {
    createBox,
    createText,
    createTheme,
    useTheme as useReTheme
} from '@shopify/restyle';

export const palette = {
    BLACK: '#1f1f1f',
    BLACK2: '#1A1A1A',
    BLACK_DARKER: '#000',
    WHITE: '#FFFFFF',
    DARKER_BLUE: '#2a3b56',
    DARK_BLUE: '#00378b',
    MEDIUM_BLUE: '#27579b', // "#1261b7",
    LIGHT_BLUE: '#27a9e0',
    TEXT: '#717171',
    RED: '#cc0000',
    GREY: '#848484',
    GREY_MEDIUM: '#c7c7c7', // "#adadad",
    GREY_LIGHT: '#f6f4f4',
    GREY_LIGHT_2: '#d2d2d2',
    TEXT_NOTE: '#9b9b9c',
    ORANGE: '#ffc107',
    GREEN: '#169600', //"#28a745",
    INFO: '#27a9e0',
    PURPLE: '#441A7B',
    MAIN_GREEN: '#36de94',
    FACEBOOK_BLUE: '#4267B2',
    GOOGLE_BACKGROUND: '#fff8f8'
};

interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}

const scale = 1;
const theme = createTheme({
    colors: {
        // Basic colors
        white: palette.WHITE,
        black: palette.BLACK_DARKER,
        black2: palette.BLACK2,
        // Primary
        primaryLight: palette.PURPLE,
        primaryMain: palette.PURPLE,
        primaryDark: palette.PURPLE,
        primaryDarker: palette.PURPLE,
        primaryTextDark: palette.PURPLE,
        primaryContrastText: palette.WHITE,
        // Secondary
        secondaryLight: palette.PURPLE,
        secondaryMain: palette.PURPLE,
        secondaryContrastText: palette.WHITE,

        // Secondary
        accentLight: palette.PURPLE,
        accentMain: palette.PURPLE,
        accentContrastText: palette.WHITE,

        // Warning
        warningMain: palette.ORANGE,
        warningContrastText: palette.WHITE,
        // Info
        infoMain: palette.INFO,
        infoContrastText: palette.WHITE,
        // Success
        successMain: palette.MAIN_GREEN,
        successContrastText: palette.WHITE,

        // Danger
        dangerMain: palette.RED,
        dangerContrastText: palette.WHITE,
        // Grey
        greyMain: palette.GREY,
        greyLight: palette.GREY_LIGHT,
        greyLight2: palette.GREY_LIGHT_2,

        greyMedium: palette.GREY_MEDIUM,
        // Text
        textColor: palette.TEXT,
        textNoteColor: palette.TEXT_NOTE,
        headingText: palette.BLACK_DARKER,
        textInputColor: palette.TEXT,
        inputLabelColor: palette.BLACK_DARKER,
        inputPlaceholderColor: palette.GREY,

        facebookBlue: palette.FACEBOOK_BLUE,
        googleButton: palette.GOOGLE_BACKGROUND
    },
    textVariants: {
        header: {
            fontSize: 34 * scale,
            lineHeight: 34 * scale,
            fontFamily: 'CitybestFont'
        },
        subheader: {
            lineHeight: 36,
            fontFamily: 'CitybestFont'
        },
        big1: {
            color: 'headingText',
            fontSize: 35 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 35 * scale
        },
        button: {
            color: 'primaryContrastText',
            fontSize: 16 * scale,
            lineHeight: 16 * scale,
            fontFamily: 'CitybestFont'
        },
        heading1: {
            color: 'headingText',
            fontSize: 24 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 24 * scale
        },
        heading2: {
            color: 'headingText',
            fontSize: 20 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 20 * scale
        },
        heading3: {
            color: 'headingText',
            fontSize: 16 * scale,
            lineHeight: 16 * scale,
            fontFamily: 'CitybestFont'
        },
        inputLabel: {
            color: 'inputLabelColor',
            fontSize: 15 * scale,
            lineHeight: 15 * scale,
            fontFamily: 'CitybestFont'
        },
        body: {
            fontFamily: 'CitybestFont',
            fontSize: 13 * scale,
            color: 'textColor',
            lineHeight: 13 * scale
        },
        body1: {
            color: 'textColor',
            fontSize: 14 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 14 * scale
        },
        medium: {
            color: 'textColor',
            fontSize: 12 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 12 * scale
        },
        small: {
            color: 'textColor',
            fontSize: 11 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 11 * scale
        },
        xsmall: {
            color: 'textColor',
            fontSize: 10 * scale,
            fontFamily: 'CitybestFont',
            lineHeight: 10 * scale
        },
        navigationHeaderTitle: {
            color: 'black',
            fontSize: 24 * scale,
            lineHeight: 24 * scale,
            fontFamily: 'CitybestFont'
        },
        drawerItemsLabel: {
            color: 'black',
            fontSize: 18 * scale,
            lineHeight: 18 * scale,
            fontFamily: 'CitybestFont'
        }
    },
    iconSizes: {
        s: 20,
        m: 40,
        l: 60
    },
    spacing: {
        xs: 2,
        s: 8,
        m: 16,
        l: 24,
        xl: 40
    },
    breakpoints: {
        phone: 0,
        tablet: 768
    },
    borderRadius: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40
    },
    buttonSizes: {
        s: 30,
        m: 50,
        l: 60
    }
});

export type Theme = typeof theme;
export const useTheme = () => useReTheme<Theme>();
export const BaseBox = createBox<Theme>();
export const BaseText = createText<Theme>();

export default theme;
