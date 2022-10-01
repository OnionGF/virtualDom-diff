/*
 * @Author: onino
 * @Date: 2022-10-01 12:34:14
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 13:03:07
 * @Description: 更新 文本dom 元素
 */


export  default function updateNodeElement(virtualDOM, oldVirtualDOM, oldDOM) {

    if(virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
        oldDOM.textContent = virtualDOM.props.textContent
        oldDOM._virtualDOM = virtualDOM
    }
}