import React from "react";
import ReactDOM from "react-dom/client";

import(/* webpackChunkName: "app" */ "./app/App")
.then(({ App }) => {
    ReactDOM
    .createRoot(document.getElementById("root") as HTMLElement)
    .render(
        <React.Fragment>
            <App />
        </React.Fragment>
    )
});



