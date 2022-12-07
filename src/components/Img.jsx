import { useEffect, useState } from "react";

const url =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXz9Pa5vsra3eO2u8j29/jY2uHHy9Tg4ufu7/Ly8/Xo6u66v8vN0dnFydPQ09vKztfj5elzp06wAAACKUlEQVR4nO3bba9DMBiA4aKj3vf/f+105q01oYlI+tzXxx1L7A5VTikFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBKB3l6r29Vpa8QhYk2i8mzQMnr6X2/SVlnSaisi/JI0V14kiFK9fT+36Gsh59W5wFa26SJ8UAxw2GSmaDrzmv4avv0/t/h26QM+aZOaeIS0kQrU54eIEQ00e92mHS0xckqEppMV+WsP/dNAU2WicrJC6yAJia7OBOLv8l3tnE0Zfc+EtCkX03ZW7+J7irnQwFN8uMmTZY4UQQ0Wd8L9l6Txv51GyX+Juq9Gk8KZyP9TZLUmygCmuh2jlI72/ySOFEENJkfLg0Dx3aTOck2ioQmquwT+0QxN84mzWqkWY0pIpoobYrUf/C8SbKKIqOJ2puZOUmW00dME5eXZIkitclOkjmKqCbLGLubZBpTBDXR1fKs4E+SMYqcJrqq5/viv0kSO4UR08Qm+T0s+HfiWHb2L6WJrn6/udNHSSQ1mZLYKEdJBDVZkti7niNimoxjySlSmlxIIqXJ+sShydjkShIhTXRLkwlNfDTx0cRHE9/S5NLSWBFN1Lu4wohochlNfLE3CVofa5vkT+//HUp7GcnTELVd+xbjOmrV2yclYa9l7KxAiMOlez93mhLlcGJXxYa+rLLz7/ZYaJP2Ie9l5E2cJ84o7NW+yF8IBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc+AAOCx0znmslSgAAAABJRU5ErkJggg==";

const Image = ({ className, src, iconSize }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    return () => {
      setError(false);
    };
  }, [src]);
  if (error) return <img className={className} src={url} />;
  return <img className={className} src={src} onError={() => setError(true)} />;
};

export default Image;
