import { FC, useLayoutEffect, useState } from 'react';
import { RipplePropsTypes } from './types';
import { RippleContainer } from "./Ripple.styled";

const useDebouncedRippleCleanUp = (
    rippleCount: number, 
    duration: number, 
    cleanUpFunction: () => void
) => {
    useLayoutEffect(() => {
      let bounce: any = null;
      if (rippleCount > 0) {
        clearTimeout(bounce);
  
        bounce = setTimeout(() => {
          cleanUpFunction();
          clearTimeout(bounce);
        }, duration * 4);
      }
  
      return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
  };


const Ripple: FC<RipplePropsTypes>  = ({
    color = '#fff', 
    duration = 1000
}) => {
    const [rippleArray, setRippleArray] = useState<Array<{x: number, y: number, size: number}>>([]);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple: React.MouseEventHandler = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
          rippleContainer.width > rippleContainer.height
            ? rippleContainer.width
            : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        const newRipple = {
          x,
          y,
          size
        };
    
        setRippleArray([...rippleArray, newRipple]);
      };

    return (
        <div>
            <RippleContainer
                duration={duration} color={color} onMouseDown={addRipple}
                >
                    {rippleArray.length > 0 &&
                        rippleArray.map((ripple, index) => {
                        return (
                            <span
                            key={"span" + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size
                            }}
                            />
                        );
                        })}

            </RippleContainer>
        </div>
    )
}

export default Ripple;