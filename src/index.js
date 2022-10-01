/*
 * @Author: onino
 * @Date: 2022-10-01 09:15:45
 * @LastEditors: onino
 * @LastEditTime: 2022-10-01 20:00:39
 * @Description: 请填写简介
 */
import TinyReact from "./TinyReact";

const root = document.getElementById('root');
// const virtualDOM = (
//     <div className="container">
//         <h1>你好 Tiny React</h1>
//         <h2 data-old="test123">(编码必杀技)</h2>
//         <div>
//             嵌套1 <div>嵌套 1.1</div>
//         </div>
//         <h3>(观察 这个将会被改变)</h3>
//         {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//         {2 == 2 && <div>2</div>}
//         <span>这是一段内容</span>
//         <span>这是一段内容</span>
//         <button onClick={() => alert("你好")}>点击我</button>
//         <h3>这个将会被删除</h3>
//         <h3>这个将会被删除</h3>
//         2, 3
//         <input type="text" value="13" />
//     </div>
// )
// const modifyDOM = (
//     <div className="container">
//         <h1>你好 Tiny React</h1>
//         <h2 data-test="test123">(编码必杀技)</h2>
//         <div>
//             嵌套1 <div>嵌套 1.1</div>
//         </div>
//         <h3>(已经改变了)</h3>
//         {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//         {2 == 2 && <div>2</div>}
//         <span>这是一段内容</span>
//         <button onClick={() => alert("你好12121")}>点击我</button>
//         <h6>这个将会被删除</h6>
//         2, 3
//         <input type="text" value="13" />
//     </div>
// )
// console.log(virtualDOM)

const virtualDOM = (
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
)
const modifyDOM = (
    <ul>
        <li>1</li>
        <li>3</li>
        <li>4</li>
    </ul>
)
// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//     TinyReact.render(modifyDOM, root)
// }, 2000)

function Heart(props) {
    return (
        <div>
            {props.title}
            <Demo />
        </div>
    )
}

function Demo() {
    return <div>&hearts;</div>
}


// TinyReact.render(<Heart title="Hello React"/>, root)

class Alert extends TinyReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "default Title"
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            title: 'changed title'
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps)
    }
    componentWillUpdate() {
        console.log("componentWillUpdate")
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    render() {
        console.log(100, this.state)
        return <div> 
            { this.props.name }
            HEllo React<br />
            { this.state.title}
            <button onClick={this.handleClick}>改变title</button>
        </div>
    }
}

// TinyReact.render(<Alert name="张三" age={20} />, root)
// setTimeout(() => {
//     TinyReact.render(<Alert name="李四" age={50} />, root)
// }, 2000)
class DemoRef extends TinyReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "default Title"
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        console.log(this.input.value)
        console.log(this.alert)
    }
  
    componentDidMount() {
        console.log('componentDidMount', 137)
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    render() {
        console.log(100, this.state)
        return <div>
            <input  type="text" ref={input => (this.input = input)}/>
            <button onClick={this.handleClick}>按钮</button>
            <Alert ref={alert => this.alert = alert} name="张三" age={20} />
        </div>
    }
}
// TinyReact.render(<DemoRef />, root)
class KeyDemo extends TinyReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    id: 1,
                    name: "张三"
                },
                {
                    id: 2,
                    name: "李四"
                },
                {
                    id: 3,
                    name: "王五"
                },
                {
                    id: 4,
                    name: "赵六"
                }
            ]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        const newState = JSON.parse(JSON.stringify(this.state))
        // newState.persons.push(newState.persons.shift())
        // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
        newState.persons.pop()
        console.log('newState', newState)
        this.setState(newState)
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.persons.map(person => (
                        <li key={person.id}>{person.name}
                        <DemoRef />
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleClick}>按钮</button>
            </div>
        )
    }
}

TinyReact.render(<KeyDemo />, root)
