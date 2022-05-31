export default function GameOverBox (props){
    return(
        <div className="column box">
        <h1 className="over">IT IS OVER</h1>
        <p>
          {props.showPoint} Right Answer{props.showPoint > 1 && "s"} out of {props.dataLength}
        </p>
        {props.showPoint === props.dataLength && <h1 className="right">🎉PERFECT!🎉</h1>}
        <div className="button" onClick={props.restart}>
          Restart
        </div>
      </div>
    )
}