import { Platform, Share } from 'react-native';

export type ShareContent =
    | {
          title?: string;
          message: string;
      }
    | {
          title?: string;
          url: string;
      };

const SharingUtils = {
    async share(props: ShareContent) {
        //@ts-ignore
        const text = Platform.select({
            //@ts-ignore
            ios: props.message,
            //@ts-ignore
            android: props.url
                ? //@ts-ignore
                  props.message.concat(' ' + props.url)
                : //@ts-ignore
                  props.message
        });

        const result = await Share.share(
            { ...props, message: text },
            {
                // Android only:
                dialogTitle: props.title,
                // iOS only:
                excludedActivityTypes: []
            }
        );

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    }
};

export default SharingUtils;
