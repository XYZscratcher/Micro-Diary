import { useState } from 'react';

import 'lxgw-wenkai-lite-webfont/style.css';
import './App.css';

import { Calendar, theme, ConfigProvider, Layout } from 'antd'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { Content } from 'antd/es/layout/layout';
import { WindowSetMinSize } from '../wailsjs/runtime/runtime'

if (window.runtime) {
    WindowSetMinSize(800, 600)
}
dayjs.locale('zh-cn');
let obj = {
    '2023-05-27': {
        title: "Hello",
        text: "world",
    },
    '2023-05-26': {
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

}
function App() {
    const [text, setText] = useState("");

    const { token } = theme.useToken();
    const wrapperStyle = {
        maxWidth: CSS.rem(20),
        //border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        margin: CSS.rem(2),
        flexBasis: new CSSUnitValue(40, "%"),
    };

    const dateFullCellRender = (date, originNode) => {
        if (date.format("YYYY-MM-DD") in obj) {
            return <div style={{
                color: token.blue6,
                fontWeight: "bold"
            }}>{date.format("DD")}</div>
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
                    <div id="riji_box">
                        <div style={wrapperStyle}>
                            <ConfigProvider locale={locale}>
                                <Calendar fullscreen={false} onSelect={(d) => {
                                    let a = onSelect(d); setText(a.text)
                                }} fullCellRender={fullCellRender} style={{ fontSize: CSS.rem(1) }} />
                            </ConfigProvider>
                        </div>
                        <textarea id="riji" value={text}
                            onChange={e => { setText(e.target.value); }} ></textarea>
                    </div>
                    {/*<a href="/">hhhh</a>*/}
                </Content>
            </Layout>
        </div>




    )
};
function MainApp() {
    if (isSetPSW()) {
        return <App />
    }
    return <Password />
}
export default App
