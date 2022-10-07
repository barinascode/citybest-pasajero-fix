import AppIcon from '@main-components/AppIcon';
import BaseTextInput from '@main-components/BaseInputs/BaseTextInput';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useSearchPlace from '@modules/request/application/hooks/use-search-place';
import AddressListItem from '@modules/user/ui/screens/Dashboard/components/AddressListItem';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useMemoOne } from '@modules/_shared/domain/utils/hooks';
import { useDebounce } from '@modules/_shared/domain/utils/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface RequestNewRouteModalProps {
    visible: boolean;
    onClose: any;
}

export default function RequestNewRouteModal(props: RequestNewRouteModalProps) {
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [selectedDestination, setSelectedDestination] = useState();

    const { results } = useInputSearchHandler({
        currentValue: currentValue
    });

    const Routes = useMemoOne(() => <DestinationRoutes count={2} />, []);

    return (
        <Box>
            <Modal
                onDismiss={props.onClose}
                contentContainerStyle={{
                    width: '95%',
                    alignSelf: 'center'
                }}
                visible={props.visible}
            >
                <Box minHeight={250} width="100%" bg="white">
                    <Box mb="m" justifyContent="center" alignItems="center">
                        <Text variant="heading3" bold>
                            Agregar nuevo destino
                        </Text>
                    </Box>
                    <Box alignItems="center" flexDirection="row">
                        {Routes}

                        <Box flex={1}>
                            <RequestInputWrapper isOrigin>
                                <BaseTextInput
                                    showUnderline={false}
                                    textInputColor="black"
                                    value="Mi casa"
                                    inputPlaceholderColor="black"
                                    disabled
                                />
                            </RequestInputWrapper>
                            <RequestInputWrapper>
                                <BaseTextInput
                                    showUnderline={false}
                                    textInputColor="black"
                                    inputPlaceholderColor="black"
                                    value="Confraterninad 599, los olivos, peru"
                                    disabled
                                />
                            </RequestInputWrapper>
                            <RequestInputWrapper>
                                <BaseTextInput
                                    showUnderline={false}
                                    textInputColor="black"
                                    inputPlaceholderColor="black"
                                    autoFocus
                                    value={currentValue}
                                    onChangeText={(text) => {
                                        setCurrentValue(text);
                                        setSelectedDestination(undefined);
                                    }}
                                    placeholder="Agregar tu nuevo destino"
                                />
                            </RequestInputWrapper>
                        </Box>
                    </Box>

                    <Box mt="m">
                        <ScrollView keyboardShouldPersistTaps="always">
                            {(results ?? []).map((item) => {
                                return (
                                    <Box mb="s" key={item.id}>
                                        <AddressListItem
                                            iconName={'marker'}
                                            addressName={item.address}
                                            city={''}
                                            onPress={() => {
                                                setCurrentValue(item.address);
                                                setSelectedDestination(item);
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </ScrollView>
                    </Box>
                    <Box mt="s">
                        <Button
                            disabled={!selectedDestination}
                            title="Agregar destino"
                            backgroundColor={
                                !selectedDestination
                                    ? 'greyMain'
                                    : 'primaryMain'
                            }
                            uppercase={false}
                            onPress={function () {}}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

function useInputSearchHandler({ currentValue }) {
    const { search, loading } = useSearchPlace('CO');
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<any>(null);

    const debouncedSearchTerm = useDebounce(currentValue, 500);

    useEffect(() => {
        (async () => {
            if (debouncedSearchTerm) {
                setSearching(true);
                const searchResult: any[] = (
                    await search(debouncedSearchTerm)
                ).slice(0, 4);

                try {
                    const finalResult = await Promise.all(searchResult);

                    setResults(finalResult);
                    setSearching(false);
                } catch (error) {
                    setResults([]);

                    setSearching(false);
                }
            } else {
                setResults([]);
                setSearching(false);
            }
        })();
    }, [debouncedSearchTerm]);

    return {
        results,
        searching
    };
}

function RequestInputWrapper({
    children,
    isOrigin = false,
    isDestination = false
}: {
    children: any;
    isOrigin?: boolean;
    isDestination?: boolean;
}) {
    const theme = useTheme();
    const canRemove = !isOrigin && !isDestination;
    return (
        <Box
            style={{
                marginTop: isOrigin ? 0 : 15
            }}
            flexDirection="row"
            alignItems="center"
            width="100%"
        >
            <Box flex={1}>
                <Box
                    borderRadius={4}
                    borderWidth={1}
                    borderColor="greyMedium"
                    height={40}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

function DestinationRoutes({ count }) {
    const theme = useTheme();

    function OriginPoint() {
        return (
            <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                height={40}
            >
                <Box
                    width={20}
                    height={20}
                    backgroundColor={'primaryMain'}
                    borderRadius={20 / 2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        width={7}
                        height={7}
                        backgroundColor={'white'}
                        borderRadius={7 / 2}
                    ></Box>
                </Box>
            </Box>
        );
    }

    function Divisor() {
        return (
            <Box width="100%" justifyContent="center" height={15}>
                <Box
                    flexDirection="row"
                    width="100%"
                    height={1}
                    style={{
                        transform: [
                            {
                                rotate: '270deg'
                            }
                        ]
                    }}
                    backgroundColor="primaryMain"
                ></Box>
            </Box>
        );
    }

    function Route() {
        return (
            <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                height={40}
            >
                <AppIcon
                    name="pin"
                    size={20}
                    color={theme.colors.primaryMain}
                />
            </Box>
        );
    }

    function Destination() {
        return (
            <Box
                height={40}
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    source={images.DESTINATION}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
            </Box>
        );
    }

    return (
        <Box flex={0} width={30}>
            <OriginPoint />
            {[...new Array(count)].map((a, i) => (
                <View  key={`ke-${i}`}>
                    <Divisor />
                    {i + 1 == count ? <Destination /> : <Route />}
                </View>
            ))}
        </Box>
    );
}
