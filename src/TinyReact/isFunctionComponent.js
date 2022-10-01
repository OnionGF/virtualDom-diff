/*
 * @Author: onino
 * @Date: 2022-10-01 11:26:19
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 11:30:23
 * @Description: 判断是 函数组件 还是类组件
 */

import isFunction from "./isFunction";
export default function isFunctionComponent(virtualDOM) {

    const type = virtualDOM.type;
    // 条件成立 则说明是 函数组件
    return (
        type && 
        isFunction(virtualDOM) &&
        !(type.prototype && type.prototype.render) 
    )
}