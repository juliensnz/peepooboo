import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 42px;
`;

const ICON_WIDTH = 30;
const SELECTOR_WIDTH = 68;

const SPLIT = `(100vw - ${4 * ICON_WIDTH}px) / 8`;

const Selector = styled.div<{position: number}>`
  width: 68px;
  height: 68px;
  position: absolute;
  background: white;
  left: ${({position}) =>
    `calc(${SPLIT} + (${position} * (${SPLIT} + ${ICON_WIDTH / 2}px) * 2) - ${SELECTOR_WIDTH / 4}px);`}
  opacity: 20%;
  border-radius: 12px;
  transition: left 0.2s cubic-bezier(.47,1.64,.41,.8);
`;

const MENU_ITEMS = ['Sleep', 'Feed', 'Change', 'Stat'];
type MenuItem = typeof MENU_ITEMS[number];

type MenuProps = {
  value: MenuItem;
  onSelect: (value: MenuItem) => void;
};

const Menu = ({value, onSelect}: MenuProps) => {
  const index = MENU_ITEMS.indexOf(value);
  console.log(index);

  return (
    <Container>
      {MENU_ITEMS.map(item => (
        <Image
          key={item}
          onClick={() => onSelect(item)}
          src={`/${item}.svg`}
          alt={item}
          width={ICON_WIDTH}
          height={35}
        />
      ))}
      <Selector position={index} />
    </Container>
  );
};

export {Menu};
export type {MenuItem};
