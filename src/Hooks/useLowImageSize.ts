export const useLowImageSize = (file:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const image = new Image();
    reader.onload = () => {
        image.src = reader.result as string;
        image.onload = () => {
            const width = image.width;
            const height = image.height;
            const ratio = width / height;
            if (ratio < 1.5) {
                return true;
            }
            return false;
        };
    };
    return Image;
}