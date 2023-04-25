import {styled} from "@nextui-org/react";


export const VerticalSemitransparent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)',
});

/*

    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    padding: 75px 10px 75px 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: rgba(20, 52, 47, 0.8);
    text-decoration: none;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%);
 */