/*
 * @Author: onino
 * @Date: 2022-10-01 10:39:24
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 12:11:14
 * @Description: 创建 dom 节点
 */

import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
export default function createDOMElement(virtualDOM) {

    let newElement = null;
    if (virtualDOM.type === 'text') {
        // 根节点是文本节点
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        // 根结点是元素节点
        newElement = document.createElement(virtualDOM.type)

        // 为元素添加属性
        updateNodeElement(newElement, virtualDOM)
    }

    newElement._virtualDOM = virtualDOM
    // 递归创建子节点
    virtualDOM.children.forEach(child => {
        mountElement(child, newElement)
    });

    // 处理 ref 属性
    if (virtualDOM.props && virtualDOM.props.ref) {
        virtualDOM.props.ref(newElement)
    }
    return newElement;
}