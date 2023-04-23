import {styled} from "../../stitches.config";

export const HeaderNavigation = styled('nav', {
  position: 'absolute',
  width: '960px',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  padding: '0',
  maskImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',
  '& ul': {
    textAlign: 'center',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)',
    '& li': {
      display: 'inline-block',
      '& a': {
        display: 'block',
        padding: '18px',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6)',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(51, 129, 112, 0.8)'
        }
      }
    }
  }
});
