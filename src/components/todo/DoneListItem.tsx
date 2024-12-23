import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BsDash, BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { todosActions } from 'modules/todos';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
  width: 100%;
  min-height: 70px;

  box-sizing: border-box;
  padding: 20px;
  background-color: #f7f7f7;

  color: #555;
  text-decoration: line-through;

  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  border: 1px solid #eee;
  border-radius: 5px;

  word-break: break-all;

  animation: rise 0.3s;

  @keyframes rise {
    0% {
      opacity: 0;
      transform: translateY(5px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .buttonWrap {
    min-width: max-content;
    display: flex;
    column-gap: 10px;

    button {
      position: relative;
      padding: 0;

      width: 1.2rem;
      height: 1.2rem;

      font-size: 1.2rem;

      background-color: #eee;

      border: none;
      border-radius: 50%;

      cursor: pointer;

      transition: 0.1s;

      &.undo svg {
        position: relative;
        top: 1px;
      }

      &:hover {
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);

        &.undo {
          background-color: #97d4fa;
        }

        &.delete {
          background-color: #ffacac;
        }
      }
    }
  }
`;

interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

interface IProps {
  content: ITodo;
  id: string;
}
// 현재 todoList 를 저장하는 App.tsx로 부터 TodoList.tsx -> Todo.tsx 까지 PropsDrilling 이 심한편
// 리덕스를 적용시켜보는 것을 적극적으로 검토해보기.

// ReduxToolkit 보단 일반 Redux 먼저 사용해보기!

function Done({ content, id }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const deleteDone = () => {
    dispatch(todosActions.deleteTodo({ id }));
  };

  const undo = () => {
    dispatch(todosActions.toggleTodoStatus({ id }));
  };

  return (
    <Container>
      <p>{content.content}</p>
      <div className="buttonWrap">
        <button type="button" className="undo" title="되돌리기" onClick={undo}>
          <BsArrowCounterclockwise size="1rem" />
        </button>
        <button
          type="button"
          className="delete"
          title="삭제"
          onClick={deleteDone}
        >
          <BsDash />
        </button>
      </div>
    </Container>
  );
}

export default Done;
