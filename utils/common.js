export const arrayFromLength = (number) => {
    return Array.from(new Array(number).keys()).map((key) => key + 1);
};
