function Grid({extendToBottom, header, body}){
    const style = {
        flexGrow: extendToBottom ? 1 : 0,
    }
    
    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse"
    }
    
    function createHeader(){
        return header.map(e => <td>{e}</td>);
    }
    
    function createBody() {
        return body.map(b => <tr>{createBodyCell(Object.values(b))}</tr>)
    }
    
    function createBodyCell(values) {
        return values.map(v => <td>{v}</td>)
    }
    
    return (
        <div style={style}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {createHeader()}
                    </tr>
                </thead>
                <tbody>
                    {createBody()}
                </tbody>
            </table>
        </div>
    )
}

export default Grid;