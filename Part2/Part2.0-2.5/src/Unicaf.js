import {useState} from "react";

const Header = () => {
    return(
        <h1>Give Feedback</h1>
    );
}
const Buttons = (props) => {
    return(
    <div>
        <button onClick={props.handleGood}>good</button>
        <button onClick={props.handleNeutral}>neutral</button>
        <button onClick={props.handleBad}>bad</button>
    </div>
    );
}

const StatisticLine = ({text , value}) => {
    if(text === 'positive'){
        return <tr><td>{text}</td><td>{value}%</td></tr>
    }
    return(
        <tr><td>{text}</td><td>{value}</td></tr>
    );
}

const Stats = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = Math.round(((props.good - props.bad) / total) * 10) / 10
    const positive = Math.round(((props.good / total) * 100) * 10) / 10
    return(
        <div>
            <h1>Statistics</h1>
            {total ?
                <table>
                    <tbody>
                        <StatisticLine text='good' value={props.good} />
                        <StatisticLine text='neutral' value={props.neutral} />
                        <StatisticLine text='bad' value={props.bad} />
                        <StatisticLine text='all' value={total} />
                        <StatisticLine text='average' value={average} />
                        <StatisticLine text='positive' value={positive} />
                    </tbody>
                </table>
                : <p>No feedback given</p>
            }
        </div>
    );
}

const Unicaf = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return(
        <div>
            <Header />
            <Buttons handleGood = {() => setGood(good + 1)}
                     handleNeutral={() => setNeutral(neutral + 1)}
                     handleBad={() => setBad(bad + 1)}
            />
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    );
}
export default Unicaf
