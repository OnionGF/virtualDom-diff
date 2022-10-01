/*
 * @Author: onino
 * @Date: 2022-10-01 10:46:34
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 13:25:05
 * @Description: 给每个节点添加属性
 */

export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {

    // 获取节点对应的属性对象
    const newProps = virtualDOM.props
    const oldProps = oldVirtualDOM.props || {}
    Object.keys(newProps).forEach(propName => {
        // 获取属性值
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]

        if(newPropsValue !== oldPropsValue) {
            // 判断 属性是否是 事件属性 onClick =》 click
            if (propName.slice(0, 2) === "on") {
                // 事件名称
                const eventName = propName.toLowerCase().slice(2)
                // 为元素添加事件
                newElement.addEventListener(eventName, newPropsValue)
                // 删除 原有的事件处理函数
                if (oldPropsValue) {
                    newElement.removeEventListener(eventName, oldPropsValue)
                }
            } else if (propName === 'checked' || propName === 'value') {
                newElement[propName] = newPropsValue
            } else if (propName !== 'children') {
                // children 不是属性 是元素
                if (propName === 'className') {
                    newElement.setAttribute('class', newPropsValue)
                } else {
                    newElement.setAttribute(propName, newPropsValue)
                }
            }
        }
        
    })

    // 判断属性被删除的情况, 防止老的属性 没有被卸载
    Object.keys(oldProps).forEach(propName => {
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]
        // 某个老的属性 在新的对象中 没有找到 说明该属性被删除了
        if(!newPropsValue) {
            if (propName.slice(0,2) === 'on') {
                const eventName = propName.toLowerCase().slice(2)
                newElement.removeEventListener(eventName, oldPropsValue)
            } else if (propName !== 'children') {
                newElement.removeAttribute(propName)
            }
        }
    })
}