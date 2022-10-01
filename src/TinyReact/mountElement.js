/*
 * @Author: onino
 * @Date: 2022-10-01 10:21:11
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 17:04:36
 * @Description: 将节点(普通节点 或者 组件) 插入到页面中
 */

import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';
import isFunction from './isFunction';
export default function mountElement(virtualDOM, container, oldDOM) {
    // component or nativeElement
    if (isFunction(virtualDOM)) {
        // component
        mountComponent(virtualDOM, container, oldDOM)
    } else {
        // nativeElement
        mountNativeElement(virtualDOM, container, oldDOM)
    }

}