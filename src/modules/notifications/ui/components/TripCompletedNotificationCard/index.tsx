import Box from '@main-components/Box';
import LoopingVideo from '@main-components/LoopingVideo';
// import Modal from '@main-components/Modal';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import ThankModalBody from 'integration/modules/ThankModalBody';
// import CustomModal from 'integration/ui/CustomModal';
import React from 'react';
import { Text } from 'react-native';
import TripNotificationCard from '../TripNotificationCard';
import Modal from "react-native-modal";
interface TripCompletedNotificationCardProps {}

export default function TripCompletedNotificationCard(
    props: TripCompletedNotificationCardProps
) {
    const theme = useTheme();
    const { width } = useDimensions();

    const w = width - 50;
    return (
        <TripNotificationCard
            style={{
                width: '100%',
                backgroundColor: 'transparent',
                borderRadius: 0,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 260
            }}
        >
            <Box width={'100%'} justifyContent="center" alignItems="center">

                
             
            </Box>
        </TripNotificationCard>
    );
}


            

export function TripCompletedNotificationCardController({
    show,
    onDismiss
}: {
    show: boolean;

    onDismiss: any;
}) {
    return (
        <>
        {/* <Modal
                onBackdropPress={onDismiss}
                isVisible={show}>
                <ThankModalBody onPressClose={onDismiss}/>
            </Modal> */}
        </>
        

    
    );
}


// export function TripCompletedNotificationCardController({
//     show,
//     onDismiss
// }: {
//     show: boolean;

//     onDismiss: any;
// }) {
//     return (
//         <Modal
//             visible={true}
//             contentContainerStyle={{
//                 backgroundColor: 'transparent',
//                 border: 0,
//                 margin: 0
//             }}
//             onDismiss={onDismiss}
//         >
//             <ThankModalBody />

//         </Modal>
//     );
// }
