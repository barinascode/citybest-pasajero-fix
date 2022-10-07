import Image from '@main-components/Image';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import React, { useEffect } from 'react';

export function DriverProfileImage({
    profilePictureUrl
}: {
    profilePictureUrl?: string;
}) {
    const theme = useTheme();
    const { data: user } = useGetProfile();
    console.log("🚀 ~ file: index.tsx ~ line 14 ~ data", user)

    return (
        <Image
            source={ (profilePictureUrl) ? { uri: profilePictureUrl } : images.DEFAULT_PHOTO }
            resizeMode={'cover'}
            style={{
                borderWidth: 1,
                borderRadius: (50 - 2) / 2,
                borderColor: theme.colors.primaryMain,
                width: 50 - 2,
                height: 50 - 2,
                resizeMode: 'cover'
            }}
        />
    );
}
