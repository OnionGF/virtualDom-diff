/*
 * @Author: onino
 * @Date: 2022-10-01 11:18:12
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 11:20:59
 * @Description: 判断是否是函数（组件） 组件在虚拟dom中是函数 
 */

export default function isFunction(virtualDOM) {
    return virtualDOM && typeof virtualDOM.type === 'function'
}