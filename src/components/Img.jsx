import { useEffect, useState } from "react";
import { BiImage } from "react-icons/bi";

const Image = ({ className, src, iconSize }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    return () => {
      setError(false);
    };
  }, [src]);
  if (error)
    return (
      <div
        style={{
          background: "#eee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={className}
      >
        <BiImage fontSize={iconSize || 60} />
      </div>
    );
  return <img className={className} src={src} onError={() => setError(true)} />;
};

export default Image;
