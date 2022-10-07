import React, { useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/es-mx';

export default function DateFormatter({
    children,
    element,
    format
}: {
    children: React.ReactNode;
    format: string;
    element: any;
}) {
    return (
        <Moment format={format} element={element} locale="es-mx">
            {children}
        </Moment>
    );
}
