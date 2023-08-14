import {Override} from '@/domain/model/Override';
import Image from 'next/image';
import {InputHTMLAttributes} from 'react';
import styled from 'styled-components';

type CheckboxInputProps = Override<
  InputHTMLAttributes<HTMLInputElement>,
  {
    icon: string;
    value: boolean | undefined;
    onChange: (value: boolean) => void;
  }
>;

const Icon = styled(Image)<{active: boolean}>`
  opacity: ${({active}) => (active ? 1 : 0.2)};
  touch-action: manipulation;
`;

const Input = styled.input`
  display: none;
  touch-action: manipulation;
`;

const CheckboxInput = ({value, onChange, icon, ...props}: CheckboxInputProps) => {
  return (
    <label>
      <Icon active={value ?? false} src={`/icon/${icon}.svg`} width={50} height={50} alt={icon} />
      <Input type="checkbox" {...props} checked={value} onChange={event => onChange(event.target.checked)} />
    </label>
  );
};

export {CheckboxInput};
