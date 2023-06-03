import { useState } from 'react';

import 'lxgw-wenkai-lite-webfont/style.css';
import './App.css';

import { CheckOutlined } from '@ant-design/icons';
import { Calendar, ConfigProvider, Layout, theme, Form, Input } from 'antd';

import { Content } from 'antd/es/layout/layout';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { WindowSetMinSize, WindowSetSize } from '../wailsjs/runtime/runtime';

if (window.runtime) {
    WindowSetSize(1000, 750)
    WindowSetMinSize(800, 600)
}
//dayjs.locale('zh-cn');
let obj = {
    '2023-05-27': {
        title: "Hello",
        text: "world",
    },
    '2023-06-03': {
        title: "Hello",
        text: "你好！！！",
    }
}
const onSelect = (date) => {
    const time = date.format('YYYY-MM-DD')
    console.log(time)
    localStorage.setItem('time', time)
    return obj[time] ?? { title: "", text: "" };
}
function Password() {
    return (<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    }]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    </div>)
}
function App() {
    const [text, setText] = useState(onSelect(dayjs()).text);

    const { token } = theme.useToken();
    const wrapperStyle = {
        maxWidth: CSS.rem(20),
        //border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        margin: CSS.rem(2),
        flexBasis: CSS.percent(40),
    };

    const dateFullCellRender = (date, originNode) => {
        if (date.format("YYYY-MM-DD") in obj) {
            /*return <div style={{
                color: token.blue6,
                fontWeight: "bold"
            }}>{date.format("DD")}</div>*/
            return <CheckOutlined style={{ color: token['green-6'], fontSize: CSS.rem(1.4), verticalAlign: "bottom" }}
                className="ant-picker-cell-inner" />
        }
        return originNode
    }

    const fullCellRender = (date, {
        originNode, type }) => {
        if (type === "date") {
            return dateFullCellRender(date, originNode)
        }
        //console.log(originNode)
        return originNode
    }
    return (
        <div id="App">
            <Layout style={{ height: CSS.vh(100) }}>
                <Content>
                    {true ? <div id="riji_box">
                        <div style={wrapperStyle}>
                            <ConfigProvider locale={locale}>
                                <Calendar fullscreen={false} onSelect={(d) => {
                                    let a = onSelect(d); setText(a.text)
                                }} fullCellRender={fullCellRender} style={{ fontSize: CSS.rem(1) }} />
                            </ConfigProvider>
                        </div>
                        <textarea id="riji" value={text}
                            onChange={e => { setText(e.target.value); }} ></textarea>
                    </div> : <Password />}
                    {/*<a href="/">hhhh</a>*/}
                </Content>
            </Layout>
        </div>




    )
};
function MainApp() {
    if (true) {
        return <App />
    }
    return <Password />
}
export default App
