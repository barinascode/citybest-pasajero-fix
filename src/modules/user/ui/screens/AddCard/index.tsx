import Box from '@main-components/Box';
import SaveButton from '@main-components/Form/SaveButton';
import Image from '@main-components/Image';
import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useSaveCard from '@modules/user/application/hooks/use-save-card';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import CardForm from './components/CardForm';

export default function AddCard(props) {
    const theme = useTheme();
    const [cardToken, setCardToken] = useState();
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const { save, loading: savingCard, error } = useSaveCard();

    const { navigate, reset, goBack } = useNavigation();

    function FormToolbar({ webViewRef }: { webViewRef: any }) {
        return (
            <Box mt="m">
                <SaveButton
                    label="Guardar"
                    uppercase={false}
                    loading={loading}
                    onSubmit={async (data: any) => {
                        setLoading(true);
                        webViewRef.current.postMessage(JSON.stringify(data),'*');
                    }}
                    disabled={loading}
                />
            </Box>
        );
    }

    return (
        <Box flex={1}>
            <Box flex={1}>
                <StatusBar />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{
                        margin: 5
                    }}
                >
                    <Box style={{ marginTop: 60 }}>
                        <BackButton />
                        <Box
                            mb="m"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box mr="m">
                                <Image
                                    source={images.SECONDARY_ARROW}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 20,
                                        height: 20
                                    }}
                                />
                            </Box>
                            <Text variant="heading1" align="center">
                                Agregar Tarjeta
                            </Text>
                        </Box>
                        <Box
                            style={{
                                position: 'absolute',
                                top: -15,
                                right: 10
                            }}
                        >
                            <Image
                                source={images.ISO_LOGO}
                                style={{
                                    resizeMode: 'contain',
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </Box>
                        <Box paddingHorizontal="m">
                            <CardForm
                                onAdd={(cardToken: any) => {
                                    console.log("CARD TOKEN===>", cardToken)
                                    save({ cardToken: cardToken }).then(() => {
                                        setSaved(true);
                                        setLoading(false);
                                        goBack();
                                    });
                                }}
                                CustomFormToolbar={FormToolbar}
                                setLoading={setLoading}
                            />
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
            <Box>
                <Image
                    source={images.FOOTER}
                    style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: 180
                    }}
                />
            </Box>
        </Box>
    );
}
