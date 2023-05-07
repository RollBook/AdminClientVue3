/**
 * 判断对象中是否存在key
 * @param key 对象key
 * @param object 对象
 * @returns boolean
 */
export function isValidKey<T extends Object>(
    key: string | number | symbol,
    object: T
): key is keyof typeof object {
    return key in object;
}

