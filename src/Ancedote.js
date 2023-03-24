import { useState } from 'react'
const Button = (props) => {
    return(
        <div>
            <button onClick={props.handleVote}>vote</button>
            <button onClick={props.handleClick}>next anecdote</button>
        </div>
    );
}

const Anecdote = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    let [selected, setSelected] = useState(0)
    // create 0 filled array of size of anecdotes list
    let points = new Array(anecdotes.length).fill(0)
    // set our update variable equal to the new array we just made
    const [vote, setVote] = useState(points)
     // return a new array which will check if the index we are at is equal to the index passed in
     // if this is true return 1 + the value of whatever element's index we were at
     // else return the value of the element unchanged
     function handleVote(index){
        const next = vote.map((c,i) => {
            if (i === index){
                return c + 1;
            }
            else{
                return c;
            }
         });
         setVote(next);
     }
     // set a function to find most votes in list and return index of that element
     function mostVotes(votes){
        // must use a destructor, so we can manipulate a copy of the array in JS
        const m = Math.max(...votes)
         if(m === 0){
             return 0;
         }
         // 'findIndex' takes in a function.
         // we declare largest as a function which is true when x is m
         let largest = (x) => x === m;
        return votes.findIndex(largest);
     }
    return (
        <div>
            <h1>Anecdote of the Day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
            <Button handleClick = {() => setSelected(selected = Math.floor(Math.random() * anecdotes.length) )}
                    handleVote = {() => handleVote(selected)}
            />
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotes(vote)]}</p>
        </div>
    )
}

export default Anecdote
