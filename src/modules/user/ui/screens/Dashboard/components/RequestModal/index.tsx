import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Image from '@main-components/Image';
import { statusBarHeight } from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import { travelActions } from 'integration/modules/Travel/store/travel.slice';
import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import RequestForm from './components/RequestForm';

export interface RequestModalProps { }

export default function RequestModal(props: RequestModalProps) {
    const {
        togglePickLocation,
        updateOriginLocation,
        setShowRequestModal,
        showRequestModal,
        resetRequestState,
        dismissSuggestionList
    } = useDashboardContextProvider((state) => ({
        resetRequestState: state.resetRequestState,
        dismissSuggestionList: state.dismissSuggestionList,
        togglePickLocation: state.togglePickLocation,
        setShowRequestModal: state.setShowRequestModal,
        showRequestModal: state.showRequestModal,
        updateOriginLocation: state.updateOriginLocation
    }));

    const dimensions = useDimensions();
    const initialPosition = { x: 0, y: -dimensions.height * 2 };
    const targetPosition = { x: 0, y: 0 };
    const translateY = useSharedValue(0);
    const visible = showRequestModal;
    const { location } = useUtils();

    const styles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            width: dimensions.width,
            left: 0,
            zIndex: 99999,

            transform: [
                {
                    translateY: withTiming(translateY.value, {
                        duration: 500
                    })
                }
            ]
        };
    });

    function close() {
        translateY.value = initialPosition.y;
    }

    function open() {
        translateY.value = targetPosition.y;
    }

    async function setDefaultOrigin() {
        const position = await location.getCurrentPosition();
        const address = await location.getPositionAddress(position);
        updateOriginLocation({
            coords: position,
            address: address.street + ' ' + address.shortAddress,
            valid: true
        });
    }

    useEffect(() => {
        if (visible) {
            open();
            return;
        }
        close();
    }, [visible]);

    useEffect(() => {
        (async () => {
            if (showRequestModal) {
                await setDefaultOrigin();
                dismissSuggestionList(false);
            }
        })();
    }, [showRequestModal]);

    return (
        <Animated.View style={{ ...styles }}>
            <ModalContent
                onClose={() => {
                    Keyboard.dismiss();
                    close();
                    setShowRequestModal(false);
                    dismissSuggestionList(true);
                    resetRequestState();
                }}
            />
        </Animated.View>
    );
}

function ModalContent(props: any) {
    const dispatch = useDispatch();


    return (
        <Box
            width="100%"
            style={{
                paddingTop: statusBarHeight,
                paddingBottom: 0,
                backgroundColor: "#f6f6f6",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,

            }}
        >
            <Box
                style={{ paddingBottom: 0 }}
                alignItems="center"
                mb="s"
                flexDirection="row"
                padding="m"
            >
                <TouchableOpacity onPress={() => {
                        dispatch(travelActions.setIsHotelRequest(false))
                        props.onClose && props.onClose();
                }}>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        width={40}
                        height={40}
                        style={{
                            marginLeft: -5
                        }}
                    >
                        <Icon name="arrow-left" size="s" color="greyMain" />
                    </Box>
                </TouchableOpacity>
                <Box marginLeft="s" flex={1}>
                    <RequestModalTitle />
                </Box>
            </Box>
            <Box>
                <RequestForm />
            </Box>
        </Box>
    );
}

function RequestModalTitle() {
    const { loaded, loading, data: user } = useGetProfile();
    const theme = useTheme();
    const [FinalUser, setFinalUser] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        profilePictureUrl: user?.profilePictureUrl ?? ''
    })
    const profileState = useSelector(getProfileState)
    useEffect(() => {
        if (profileState.firstName !== "") {
            setFinalUser({
                firstName: profileState?.firstName ?? '',
                lastName: profileState?.lastName ?? '',
                email: profileState?.email ?? '',
                profilePictureUrl: profileState?.profilePictureUrl ?? ''
            })
        } else {
            setFinalUser({
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                profilePictureUrl: user?.profilePictureUrl ?? ''
            })
        }
    }, [profileState, user])

    const avatarSize = 65;
    const shortNameUser = (firsName:string, lastName:string) => {

        let result = firsName + " " + lastName
        
        result = result
        .replace('null,','')
        .replace('null','')
        
        result = result.substring(0,18)
        
        if(result.length >= 18)
            result = result + '...'
            
        return result
    }

    return (
        <Box flex={1} flexDirection="row" alignItems="center">
            <Box
                left={-0}
                position="relative"
                zIndex={9999}
                width={avatarSize}
                height={avatarSize}
            >
                <Image
                    resizeMode="cover"
                    style={{
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: FinalUser?.profilePictureUrl
                            ? avatarSize / 2
                            : 0
                    }}
                    source={
                        FinalUser?.profilePictureUrl
                            ? { uri: FinalUser?.profilePictureUrl }
                            : images.DEFAULT_PHOTO
                    }
                />
            </Box>
            <Box
                backgroundColor="white"
                borderRadius={6}
                bg="primaryMain"
                flexDirection="row"
                borderWidth={1}
                borderColor="greyLight"
                position="absolute"
                alignItems="center"
                height={65}
                paddingHorizontal="s"
                flex={1}
                style={{ marginLeft: 35, paddingLeft: 35, width : '88%' }}
            >
                <Box
                    flex={1}
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    padding="s"
                >
                    <Box justifyContent="flex-start">
                        <Box marginVertical="xs">
                            <Text
                                numberOfLines={1}
                                variant="heading3"
                                color="white"
                            >
                                Para{' '}
                                {shortNameUser(FinalUser?.firstName, FinalUser?.lastName)}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box
                    ml="s"
                    flex={0}
                    width={50}
                    justifyContent="center"
                    alignItems="center"
                >
                    <AppIcon
                        size={40}
                        name="logo-collapsed"
                        color={theme.colors.white}
                    />
                </Box>
            </Box>
        </Box>
    );
}
