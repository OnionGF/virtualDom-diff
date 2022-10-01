/*
 * @Author: onino
 * @Date: 2022-10-01 10:23:20
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 19:35:47
 * @Description:  将普通节点插入到页面中
 */

import mountElement from "./mountElement";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
export default function mountNativeElement(virtualDOM, container, oldDOM) {

    let newElement = createDOMElement(virtualDOM);
    // 将转换之后的dom 放到页面中
    console.log(newElement, oldDOM)
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM)
        // 判断 oldDOM 是否存在 在的话 删掉
        unmountNode(oldDOM)
    } else {
        container.appendChild(newElement);
    }
   
    let component = virtualDOM.component // 类组件的实例

    if (component) {
        component.setDom(newElement)
    }
}