const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    minHeight: "100vh"
}

function Layout({children, firstMargin}) {
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Layout;