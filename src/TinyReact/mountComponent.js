/*
 * @Author: onino
 * @Date: 2022-10-01 11:23:24
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 18:43:22
 * @Description: 处理组件 包括函数组件 和 类组件
 */
import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";
export default function mountComponent(virtualDOM, container, oldDOM) {

    let nextVirtualDOM = null
    let component = null
    // 判断组件是类组件 还是函数 组件
    if (isFunctionComponent(virtualDOM)) {
        // 函数组件
        nextVirtualDOM = buildFunctionComponent(virtualDOM)
    } else {
        // 类组件
        nextVirtualDOM =  buildClassComponent(virtualDOM)
        // 获取组件的实例对象
        component = nextVirtualDOM.component
    }
    
    // 如果函数组件 里 嵌套函数组件 要递归处理
    if (isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container, oldDOM)
    } else {
        mountNativeElement(nextVirtualDOM, container, oldDOM)
    }
    if (component) {
        component.componentDidMount();
        if (component.props && component.props.ref) {
            component.props.ref(component)
        }
    }
}

// 拿到函数组件内的 虚拟 dom
function buildFunctionComponent(virtualDOM) {
    return virtualDOM.type(virtualDOM.props || {});
}

// 拿到类组件的 虚拟 dom
function buildClassComponent(virtualDOM) {
    const component = new virtualDOM.type(virtualDOM.props || {})
    const nextVirtualDOM = component.render()
    nextVirtualDOM.component = component
    return nextVirtualDOM
}