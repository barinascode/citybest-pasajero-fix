import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React, { useEffect } from 'react';
import { Searchbar as BaseSearchBar } from 'react-native-paper';

interface SearchBarProps {
    pointerEvents?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    onSubmit?: any;
    style?: any;
    placeholder?: string;
    onChange?: any;
    value?: string;
}

export default function SearchBar({
    placeholder = 'Busca...',
    value,
    ...props
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const theme = useTheme();

    const onChangeSearch = (q) => {
        setSearchQuery(q);
        props.onChange && props.onChange(q);
    };

    useEffect(() => {
        setSearchQuery(value ?? '');
    }, [value]);

    return (
        <BaseSearchBar
            autoFocus={props.autoFocus}
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            onSubmitEditing={(query) => {
                setSearchQuery(searchQuery);
                props.onSubmit && props.onSubmit(searchQuery);
            }}
            value={searchQuery}
            selectionColor={theme.colors.textInputColor}
            iconColor={theme.colors.black}
            pointerEvents={props.pointerEvents as any}
            theme={{
                colors: {
                    placeholder: theme.colors.inputPlaceholderColor,
                    text: theme.colors.textInputColor
                }
            }}
            style={{
                backgroundColor: 'white',
                borderRadius: 15,
                height: 45,
                elevation: 5,
                ...props.style
            }}
        />
    );
}
