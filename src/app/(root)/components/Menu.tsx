import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import styled from 'styled-components';

const ICON_WIDTH = 30;
const SELECTOR_WIDTH = 68;

const Container = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 42px;
  border-top: 0.5px solid #555;
  padding-top: 10px;
`;

const MenuElement = styled(Link)`
  touch-action: manipulation;
  width: ${SELECTOR_WIDTH}px;
  height: ${SELECTOR_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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

const MENU_ITEMS = ['sleep', 'feed', 'change', 'stat'];
type MenuItem = typeof MENU_ITEMS[number];

const Menu = () => {
  const pathname = usePathname();
  const value = pathname.slice(1);

  const index = MENU_ITEMS.indexOf(value);

  return (
    <Container>
      {MENU_ITEMS.map(item => (
        <MenuElement key={item} href={item} prefetch={true}>
          <Image src={`/icon/${item}.svg`} alt={item} width={ICON_WIDTH} height={35} />
        </MenuElement>
      ))}
      <Selector position={index} />
    </Container>
  );
};

export {Menu};
export type {MenuItem};
