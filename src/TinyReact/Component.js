/*
 * @Author: onino
 * @Date: 2022-10-01 11:49:26
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 17:29:21
 * @Description: 
 */

import diff from "./diff"


export default class Component {
    constructor(props) {
        this.props = props
    }

    // 子元素 调用 所以这里的 this 是指向子组件的 ， 通过新建一个state 合并 覆盖原有的 state
    setState(state) {
        this.state = Object.assign({}, this.state, state)
        // 获取最新的 要渲染的virtual dom
        let virtualDOM = this.render()
        // 获取旧的 virtualDOM 对象 进行比对
        let oldDOM = this.getDom()
        // 获取容器
        let container = oldDOM.parentNode
        // 比对 dom 实现渲染
        diff(virtualDOM, container, oldDOM)
    }

    setDom(dom) {
        this._dom = dom
    }

    getDom() {
        return this._dom
    }

    updateProps(props) {
        this.props = props
    }

    // 生命周期函数
    componentWillMount() { }
    componentDidMount() { }
    componentWillReceiveProps(nextProps) { }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state
    }
    componentWillUpdate(nextProps, nextState) { }
    componentDidUpdate(prevProps, preState) { }
    componentWillUnmount() { }
}