import ActivityIndicator from '@main-components/ActivityIndicator';
import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useUpdateCurrentGeoPosition from '@modules/user/application/hooks/use-update-current-geo-position';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacity as TouchableOpacity2 } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';

export default function MapOptions() {
    const theme = useTheme();
    const { update, loading } = useUpdateCurrentGeoPosition();
    const { trip } = useGetActiveTrip();

    return (<>
    
        {!trip && <Box position="absolute" bottom={100} right={20} width={70}>
            <TouchableOpacity
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    backgroundColor: theme.colors.white,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={async () => {
                    await update();
                }}
            >
                {loading ? (
                    <ActivityIndicator color="successMain" size={20} />
                ) : (
                    <AppIcon
                        size={20}
                        color={theme.colors.greyMain}
                        name="target-location"
                    />
                )}
            </TouchableOpacity>
        </Box>}

        {/* <View style={{
            width: 70,
            height : 70,
            position : 'absolute',
            bottom : 400,
            right : 20,

        }}>
            <TouchableOpacity2 style={{
                borderRadius : 100,
                backgroundColor : 'white',
                flex : 1,
                justifyContent : 'center',
                alignItems : 'center',
                opacity:0.5
                }}>
                <Ionicons name="location" size={35} color={THEME_PRIMARY_COLOR} />         
            </TouchableOpacity2>
        </View> */}
        {/* marker morado */}

        </>
    );
}
