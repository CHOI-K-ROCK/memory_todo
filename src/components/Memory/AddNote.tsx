import { notesActions } from 'modules/memory';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 30px;

  .close_btn {
    display: grid;
    place-items: center;
    padding: 3px 0;

    width: 30px;
    height: 30px;

    position: absolute;
    top: 30px;
    right: 30px;

    background: none;
    border: none;

    font-size: 1.5rem;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
      border-radius: 100vmax;
      background-color: #000;
      color: #fff;
      font-weight: bold;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NoteTitleWrapper = styled.div`
  margin-bottom: 20px;

  .title_input {
    width: 100%;
    height: 30px;

    border: none;
    outline: none;

    box-sizing: border-box;

    font-size: 1.2rem;
  }
`;

const KeywordsWrapper = styled.div`
  margin-bottom: 10px;

  .keywords_wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 12px;

    .keyword_input {
      font-size: 1rem;

      border: none;
      outline: none;
    }

    .keyword {
      font-size: 0.9rem;
      position: relative;
      min-width: 30px;
      width: max-content;
      padding: 5px 7px;

      text-align: center;
      background-color: #fff;
      border-radius: 100vmax;

      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

      user-select: none;

      overflow: hidden;

      cursor: pointer;

      &:hover::before {
        content: '✕';
        line-height: 26px;
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        background-color: #ffb9b9;

        animation: appear 0.1s linear;

        @keyframes appear {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 10px;
  .content_input {
    width: 100%;
    height: 400px;

    box-sizing: border-box;
    padding: 10px;

    resize: none;

    border: 2px solid #ddd;
    border-radius: 5px;

    font-size: 1rem;

    &:focus {
      outline: none;
      border: 2px solid #000;
    }
  }
`;

const AddBtn = styled.button`
  padding: 5px 0;

  background: none;
  border: 2px solid #ddd;
  border-radius: 100vmax;

  font-size: 1rem;

  cursor: pointer;

  transition: 0.1s;

  &:hover {
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
  }
`;

function AddNote({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      keywordValue &&
      !keywords.includes(keywordValue) &&
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false
    ) {
      setKeywords([...keywords, keywordValue]);
      setKeywordValue('');
    }
  };

  const deleteKeyword = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setKeywords(
      keywords.filter((keyword) => {
        return keyword !== e.currentTarget.innerText;
        // target 과 currentTarget 의 차이
        // tatget : 이벤트를 발생시킨 요소
        // currentTarget : 이벤트를 가지고 있는 요소
        // 미묘하지만 큰 차이임!
      })
    );
  };

  const addNote = () => {
    dispatch(
      notesActions.addNote({
        id: uuidv4(),
        title,
        keywords,
        content,
      })
    );
  };

  return (
    <Container>
      <Title>노트 추가하기</Title>
      <button
        type="button"
        className="close_btn"
        onClick={() => setOpenAdd(false)}
      >
        ✕
      </button>
      {/* 제목 */}
      <NoteTitleWrapper>
        <input
          type="text"
          className="title_input"
          placeholder="제목을 입력하세요"
          spellCheck={false}
          onChange={(e) => setTitle(e.target.value)}
        />
      </NoteTitleWrapper>
      {/* 키워드 */}
      <KeywordsWrapper>
        {/* <h3>키워드 입력</h3> */}
        {/* 키워드 표시 */}
        <div className="keywords_wrapper">
          {keywords?.map((keyword) => {
            return (
              <div
                className="keyword"
                role="button"
                key={uuidv4()}
                aria-hidden="true"
                onClick={(e) => deleteKeyword(e)}
              >
                {keyword}
              </div>
            );
          })}
          {/* 키워드 입력 */}
          <input
            type="text"
            className="keyword_input"
            spellCheck={false}
            placeholder="키워드를 입력하세요"
            value={keywordValue}
            onChange={(e) => setKeywordValue(e.currentTarget.value)}
            onKeyDown={(e) => addKeyword(e)}
          />
        </div>
      </KeywordsWrapper>
      {/* 본문 */}
      <ContentWrapper>
        <textarea
          placeholder="내용을 작성해주세요."
          className="content_input"
          spellCheck={false}
          onChange={(e) => setContent(e.target.value)}
        />
      </ContentWrapper>
      {/* 노트 추가 버튼 */}
      <AddBtn type="button" onClick={addNote}>
        작성완료
      </AddBtn>
    </Container>
  );
}

export default AddNote;