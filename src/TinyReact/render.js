/*
 * @Author: onino
 * @Date: 2022-10-01 10:12:38
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 12:12:22
 * @Description: 将虚拟 dom 转为真实 dom
 */

import diff from "./diff"

/**
 * @description: 
 * @param {*} virtualDOM 虚拟 dom
 * @param {*} container 根结点容器 通常为 root
 * @param {*} oldDOM 页面中现有的 dom 元素
 * @return {*}
 */
export default function render(
    virtualDOM, 
    container, 
    oldDOM = container.firstChild
    ) {
    diff(virtualDOM, container, oldDOM)
}