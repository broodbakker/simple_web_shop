import React, { FunctionComponent } from "react"
import styled, { keyframes, css } from "styled-components";

import { v4 as uuidv4 } from 'uuid';
//hooks
import { useArrayInterval } from "../../util/hooks/useArrayInterval"
import { renderWhiteSpace } from "../../util/function"

type TextAnimationProps = {
  lines: string[],
}

export const TextAnimation: FunctionComponent<TextAnimationProps> = ({ lines }) => {
  const text = useArrayInterval(lines)
  return (
    <Wrapper>
      {text.split("").map((item) => <span key={uuidv4()}>{renderWhiteSpace(item)}</span>)}
    </Wrapper>
  )
}

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg);  }
  25% { opacity: 1; transform: translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg); }
  75% { opacity: 1; transform: translateY(0px) skewX(0deg) skewY(0deg) rotateZ(0deg); }
  100% { opacity: 1; transform: translateY(-100px) skewX(10deg) skewY(10deg) rotateZ(30deg); }
`

function createCSS() {
  let styles = '';
  for (let i = 0; i < 20; i += 1) {
    styles += `
       span:nth-child(${i}) {
        animation-delay: ${i / 20}s;
      }
     `
  }
  return css`${styles}`;
}

const Wrapper = styled.span`
  display: inline-block;
  color:white;
  span {
    opacity: 0;
    display: inline-block;
    animation-name: ${animation};
    animation-duration: 3s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  ${createCSS()};
`