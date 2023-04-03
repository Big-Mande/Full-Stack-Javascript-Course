const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return <div>
        <Courses courses={courses} />
    </div>
};
// Courses will take in an array of objects and then return one course component for each object in that array
// maybe tweak this a lil later to use a map method that way we can also grab the respective ID's from the objects
const Courses = ({courses}) => {
    return (
        <div>
            {courses.map((e) => {
                return <Course key={e.id} name={e.name} parts={e.parts}/>;
            })}
        </div>
    );
};

const Course = ({name, parts})=>{
    return (
        <div>
        <Header name = {name}/>
        <Content parts = {parts}/>
    </div>
    );
};

const Header = ({name}) =>{
    return <h1>{name}</h1>;
};

const Part = ({name, exercises}) => {
    return(
        <p>{name} {exercises}</p>
    );
};
const Total = ({parts}) => {
    let sum = 0;
    parts.forEach((x)=>{
        sum += x.exercises;
    });
    return <p><b>total of {sum} exercises</b></p>
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((e) => {
                return <Part key={e.id} name={e.name} exercises={e.exercises} />;
            })}
            <Total parts={parts} />
        </div>
    );
};
export default App
