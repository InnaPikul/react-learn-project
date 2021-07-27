const ChangeColorBtn = (props) => {
    return (<button onClick={() => props.handleColorSwitch(props.color)}>Change background</button>)
}

export default ChangeColorBtn;