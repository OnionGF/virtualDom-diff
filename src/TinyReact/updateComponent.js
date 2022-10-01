/*
 * @Author: onino
 * @Date: 2022-10-01 17:12:01
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 18:08:11
 * @Description: 组件相同的同框下，获取组件的虚拟dom 进行比对 渲染 21、
 */

import diff from "./diff"

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {

    oldComponent.componentWillReceiveProps(virtualDOM.props)
    if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
        // 未更新前的 props
        let prevProps = oldComponent.props
        oldComponent.componentWillUpdate(virtualDOM.props)
        // 组件更新
        oldComponent.updateProps(virtualDOM.props)
        // 获取组件返回的最新的 virtualDOM
        let nextVirtualDOM = oldComponent.render()
        // 更新 component 组件实例对象
        nextVirtualDOM.component = oldComponent
        // 比对
        diff(nextVirtualDOM, container, oldDOM)
        oldComponent.componentDidUpdate(prevProps)
    }
}