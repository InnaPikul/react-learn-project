const ChangeColorBtn = (props) => {
    return (<button className="btn btn-primary" onClick={() => props.handleColorSwitch(props.color)}>Change background</button>)
}

export default ChangeColorBtn;