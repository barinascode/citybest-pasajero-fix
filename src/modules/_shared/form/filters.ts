export const onlyLetters = (text: string) => {
    let str = text.replace(/[ ](?=[ ])|[^A-Za-z ]+/g, '');
    return str;
};

export const onlyNumbers = (text: string) => {
    let str = text.replace(/\D/g, '');
    return str;
};

export const onlyLettersAndNoSpaces = (text: string) => {
    let str = text.replace(/[ ](?=[ ])|[^A-Za-z]+/g, '');
    return str;
};
