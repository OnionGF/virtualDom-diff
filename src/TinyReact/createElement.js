/*
 * @Author: onino
 * @Date: 2022-10-01 09:14:16
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 10:15:32
 * @Description: 创建虚拟 dom
 */


/**
 * @description: 
 * @param {*} type 类型 text、function
 * @param {*} props { textContent: '123' }
 * @param {array} children 数组  对象父节点的所有子节点
 * @return {*}  标准格式的虚拟 dom
 */
export default function createElement(type, props, ...children) {
     
    const childElement = [].concat(...children).reduce((result, child) => {
        // 除去子节点中 值为 false、true、null的
        if (child != false && child !=true && child != null) {
            if (child instanceof Object) {
                result.push(child)
            } else {
                // 将不标准的 text 文本 转为 标准的格式
                result.push(createElement("text", { textContent: child }))
            }
        }
        return result
    }, [])
    return {
        type,
        // 将根节点的 子节点集合挂载到props上 因为在组件里 是通过 props.children 来获取到子节点的     
        props: Object.assign({ children: childElement }, props ),
        children: childElement,
    }
}