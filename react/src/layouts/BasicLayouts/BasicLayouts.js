import React from "react";
import "./BasicLayouts.scss";

const BasicLayouts = (props) => {
    return (
        <div className="BasicLayouts">
            <div className="BasicLayouts-left">左侧导航栏</div>
            <div className="BasicLayouts-right">{props.children}</div>
        </div>
    )
}

export default BasicLayouts;