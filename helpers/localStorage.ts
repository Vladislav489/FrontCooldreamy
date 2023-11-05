const LOCAL_STORAGE = process?.browser ? window?.localStorage : null;

export default LOCAL_STORAGE;