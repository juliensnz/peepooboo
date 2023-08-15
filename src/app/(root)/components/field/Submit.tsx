import Image from 'next/image';
import styled from 'styled-components';

const SubmitInput = styled.input`
  display: none;
`;

const Submit = () => {
  return (
    <label>
      <Image src="/icon/checkmark.circle.svg" alt="checkmark" width={50} height={50} />
      <SubmitInput type="submit" />
    </label>
  );
};

export {Submit};
