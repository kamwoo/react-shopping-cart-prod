import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { clearSnackBar } from 'redux/actions/snackBar';
import { SNACKBAR_RUNNING_TIME } from 'constants';
import { useAppSelector } from 'hooks/useAppSelector';

export default function SnackBar() {
  const dispatch = useDispatch();
  const timer = useRef();
  const { text } = useAppSelector(state => state.snackBarReducer);

  if (timer.current) {
    clearTimeout(timer.current);
  }

  timer.current = setTimeout(() => {
    dispatch(clearSnackBar());
  }, SNACKBAR_RUNNING_TIME);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return text && <Styled.Box key={Math.random()}>{text}</Styled.Box>;
}

SnackBar.propTypes = {
  message: PropTypes.string,
};

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const Styled = {
  Box: styled.div`
    min-width: 250px;
    padding: 20px;

    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: rgb(123, 123, 123);
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 20px;

    position: fixed;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;

    animation-duration: 0.5s;
    animation-name: ${fadeIn};
  `,
};
