import { useState, useRef, useCallback, useReducer } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

// 랙(lag) 발생
function createBulkTools() {
  const array = [];
  for (let i = 0; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// useReducer 사용
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // onInsert
      // {type: 'INSERT', text: 'todo', checked: false}
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정관리앱 만들어보기',
  //     checked: false,
  //   },
  // ]);
  // const [todos, setTodos] = useState(createBulkTools); // 에러발생

  //useReducer 사용
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTools);

  // id ref 사용하여 변수 담기
  // const nextId = useRef(4);
  const nextId = useRef(2501); // 에러발생

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // setTodos(todos.concat(todo));
      dispatch({ type: 'INSERT', todo }); // useReducer 사용
      nextId.current++;
    },
    // [todos],
    [], // useReducer 사용
  );

  const onRemove = useCallback(
    (id) => {
      // setTodos(todos.filter((todo) => todo.id !== id));
      dispatch({ type: 'REMOVE', id });
    },
    // [todos],
    [],
  );

  const onToggle = useCallback(
    (id) => {
      // 반점은 저장하면 자동으로 생김...왜지?
      // setTodos(
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      dispatch({ type: 'TOGGLE', id });
    },
    // [todos],
    [],
  );

  // useState 함수형으로 작성
  // const onInsert = useCallback((text) => {
  //   const todo = {
  //     id: nextId.current,
  //     text,
  //     checked: false,
  //   };
  //   setTodos((todos) => {
  //     todos.concat(todo);
  //   });
  //   nextId.current++;
  // }, []);

  // const onRemove = useCallback((id) => {
  //   setTodos((todos) => todos.filter((todo) => todo.id !== id));
  // }, []);

  // const onToggle = useCallback((id) => {
  //   setTodos((todos) =>
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //     ),
  //   );
  // }, []);

  return (
    <TodoTemplate
      className="App"
      done={todos.filter((todo) => todo.checked === true).length}
      all={todos.length}
    >
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
