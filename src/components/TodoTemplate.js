import './TodoTemplate.scss';

const TodoTemplate = ({ children, done, all }) => {
  const date = new Date();
  return (
    <div className="TodoTemplate">
      <div className="app-title">
        {date.getMonth() + 1} 월 {date.getDate()} 일
        <h3 className="highlight">&nbsp;일정관리&nbsp;</h3>
        <p>
          ({done} / {all})
        </p>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
