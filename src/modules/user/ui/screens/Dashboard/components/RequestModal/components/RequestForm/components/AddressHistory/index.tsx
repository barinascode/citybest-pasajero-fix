import Box from '@main-components/Box';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import AddressListItem from '../AddressListItem';

function AddressHistory() {
    const theme = useTheme();

    const fakeAddresses = [
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        },
        {
            name: 'Centro Comercial Atlantis. Cra 11 #',
            city: 'Bogota, Colombia'
        }
    ];

    return (
        <Box>
            {fakeAddresses.map((address) => {
                return (
                    <AddressListItem
                        iconName="clock"
                        addressName={address.name}
                        city={address.city}
                    />
                );
            })}
        </Box>
    );
}
