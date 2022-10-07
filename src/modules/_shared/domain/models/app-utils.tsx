import ArrayUtils from '@shared/domain/utils/misc/array-utils';
import ClipboardUtils from '@shared/domain/utils/misc/clipboard-utils';
import DateTimeUtils from '@shared/domain/utils/misc/datetime-utils';
import LinkingUtils from '@shared/domain/utils/misc/linking-utils';
import NetworkUtils from '@shared/domain/utils/misc/network-utils';
import ObjectUtils from '@shared/domain/utils/misc/object-utils';
import LocationUtils from '../utils/misc/location-utils';
import SharingUtils from '../utils/misc/sharing-utils';

export interface AppUtils {
    object: typeof ObjectUtils;
    date: typeof DateTimeUtils;
    linking: typeof LinkingUtils;
    array: typeof ArrayUtils;
    network: typeof NetworkUtils;
    clipboard: typeof ClipboardUtils;
    location: typeof LocationUtils;
    sharing: typeof SharingUtils;
}
