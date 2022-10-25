function Datechooser({title, position, moveToRight, extendToRight}) {
    const styles = {
        display: "flex",
        flexDirection: position === "top" ? "column" : "row",
        marginLeft: moveToRight ? "auto" : ""
    }

    return (
        <div style={styles}>
            {title !== undefined &&
                <label>{title}</label>
            }
            <input type="date"/>
        </div>
    );
}

export default Datechooser;