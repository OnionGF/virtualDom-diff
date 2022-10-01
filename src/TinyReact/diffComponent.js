/*
 * @Author: onino
 * @Date: 2022-10-01 16:41:14
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 17:19:16
 * @Description: 组件比对
 */

import mountElement from "./mountElement"
import updateComponent from "./updateComponent"

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {

    if (isSameComponent(virtualDOM, oldComponent)) {
        // 是同一个组件
        updateComponent(virtualDOM, oldComponent, oldDOM, container)
    } else {
        // 不是同一个组件, 就简单了
        // 删除原来的 组件 oldDOM
        // 直接将 虚拟dom 插入到页面中
        mountElement(virtualDOM, container, oldDOM)
    }

}

// 判断是否是同一个组件

function isSameComponent(virtualDOM, oldComponent) {
    // console.log("virtualDOM", virtualDOM)
    // console.log("oldComponent", oldComponent )
    return oldComponent && virtualDOM.type === oldComponent.constructor
}