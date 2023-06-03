import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>啊这~</h1>
            <p>抱歉，我们的应用好像出了点<b>“小”错误</b>。</p>
            <p>
                错误原因：<i style={{color:"red"}}>{error.status+" "+(error.statusText || error.message)}</i>
            </p>
            <a href="/">回到主页</a>
        </div>
    );
}