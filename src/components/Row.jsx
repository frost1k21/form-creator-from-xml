const styles = {
    display: "flex",
    flexDirection: "row",
}

function Row({children}) {
    return (
        <div style={styles}>
            {children}
        </div>
    );
}

export default Row;