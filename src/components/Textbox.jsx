function Textbox({title, position, moveToRight, extendToRight}) {
    const styles = {
        display: "flex",
        flexDirection: position === "top" ? "column" : "row",
        marginLeft: moveToRight ? "auto" : "",
        flexGrow: extendToRight ? 1 : 0 
    }
    
    return (
        <div style={styles}> 
            {title !== undefined &&
                <label>{title}</label>
            }
            <input type="text" style={{flexGrow: 1}}/>
        </div>
    );
}

export default Textbox;