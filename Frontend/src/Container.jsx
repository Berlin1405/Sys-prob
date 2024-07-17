import React from 'react';

function Container({ children }) {
    const style = {
        height: "500px",
        width: "800px",
        border: "solid whitesmoke",
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px 1px 20px whitesmoke",
        borderRadius: "30px",
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Container;
