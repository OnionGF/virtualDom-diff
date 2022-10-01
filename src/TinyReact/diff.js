/*
 * @Author: onino
 * @Date: 2022-10-01 10:17:41
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 19:47:18
 * @Description: 真实dom 和 虚拟 dom 的 diff 比对
 */

import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmountNode from "./unmountNode";
import diffComponent from './diffComponent';

export default function diff(virtualDOM, container, oldDOM) {
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component
    // 判断 oldDOM 是否存在, 不存在则 直接将 virtual DOM 直接插入到页面中
    if (!oldDOM) {
        mountElement(virtualDOM, container)
    } else if (oldVirtualDOM && virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
        // 类型不同， 则不需要进行比对了 ， 直接用新的 替换老的 dom 元素, 还要考虑新的dom元素 不为function
        const newElement = createDOMElement(virtualDOM);
        oldDOM.parentNode.replaceChild(newElement, oldDOM)
    } else if (typeof virtualDOM.type === 'function') {
        // 组件 比对
        diffComponent(virtualDOM, oldComponent, oldDOM, container)
    } else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
        // 类型相同
        if (virtualDOM.type === 'text') {
            // 更新文本内容
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
        } else {
            // 更新元素属性
            updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
        }

        /**
         * @description: key属性 diff三大策略之 element 策略
         */ 

        // 1、遍历老的 将拥有key 属性的子元素放置在一个单独的对象中keyedElements
        let keyedElements = {}
        for (let i = 0, len = oldDOM.childNodes.length; i< len; i++) {
            let domElement = oldDOM.childNodes[i]
            if(domElement.nodeType === 1) { // 说明是元素节点
                let key = domElement.getAttribute("key")
                if (key) {
                    keyedElements[key] = domElement
                }
            }
        }

        let hasNoKey = Object.keys(keyedElements).length === 0

        if (hasNoKey) {
            // 对比 子节点
            virtualDOM.children.forEach((child, i) => {
                diff(child, oldDOM, oldDOM.childNodes[i])
            })
        } else {
            // 2、循环 virtualDOM（新的） 的子元素 获取子元素的 key 属性
            virtualDOM.children.forEach((child, i) => {
                let key = child.props.key

                if (key) {
                    let domElement = keyedElements[key]
                    // 判断新的元素中 是否存在相同的key

                    if (domElement) {
                        // 3、看看当前位置的元素是不是我们期望的元素
                        if(oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
                            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
                        }
                    } else {
                        // 新增元素
                        mountElement(child, oldDOM, oldDOM.childNodes[i])
                    }
                } 
            })
        }

        // 删除节点, 这种情况 是解决 list 表单 那种特殊情况
        // 获取旧节点
        let oldChildNodes = oldDOM.childNodes;
        // 判断节点数量
        if (oldChildNodes.length > virtualDOM.children.length) {
            // 有节点需要删除
            if (hasNoKey) {
                for (
                    let i = oldChildNodes.length - 1;
                    i > virtualDOM.children.length - 1;
                    i--
                ) {
                    unmountNode(oldChildNodes[i])
                }
            } else {
                // 有key 通过 key 属性删除节点
                for (let i=0; i< oldChildNodes.length; i++) {
                    let oldChild = oldChildNodes[i]
                    let oldChildKey = oldChild._virtualDOM.props.key
                    let found = false
                    for(let n = 0; n< virtualDOM.children.length; n++) {
                        if(oldChildKey === virtualDOM.children[n].props.key) {
                            found = true
                            break
                        }
                    }
                    if(!found) {
                        unmountNode(oldChild)
                    }
                }
            }
        }
    }
}