// 아이콘 관련 정보 https://react-icons.netlify.com/#/icons/md
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import { useState, useCallback } from 'react';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // button 의 onClick 이벤트로 만들어도 가능
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // 리스트 추가 된 후 리셋
      e.preventDefault(); // 기본 액션인 새로고침 방지
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="Write down things to do"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
