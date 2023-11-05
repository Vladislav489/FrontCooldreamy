const replaceSpace = (str: string) => {
    const newStr = str.replaceAll(' ', '%20');
    return newStr;
}

export default replaceSpace;