const App = () => {
    const course = {
        name: 'Half Stack Application 🦍',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Header
                course={course}
            />
            <Content
                course={course}
            />
            <Total
                course={course}
            />
        </div>
    );
}
// this gets the name of the overall course
const Header = ({course}) => {
    return(<div>
            <h1>{course.name}</h1>
        </div>
    );
}

const Part = ({part, exercise}) => {
    return(
        <p>{part} {exercise}</p>
    );

}

const Content = ({course}) => {
    return(
        <div>
            {course.parts.map((item, index) => {
                return <Part key={index} part={item.name} exercise={item.exercises} />})}
        </div>
    );
}

const Total = ({course}) => {
    const exerciseArray = course.parts
    let total = 0
    exerciseArray.forEach((item) => {
        total += item.exercises
    })
    return(
        <p>Number of exercises {total}</p>
    );
}

export default App
