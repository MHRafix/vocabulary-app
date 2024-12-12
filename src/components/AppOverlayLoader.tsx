import { Loader } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface Props {
  visible: boolean;
}

const AppOverlayLoader: React.FC<PropsWithChildren<Props>> = ({
  children,
  visible,
}) => {
  return (
    <div className="relative">
      {visible && (
        <div className="absolute top-0 left-0 grid w-full h-full overflow-hidden bg-white/80 place-content-center">
          <Loader />
        </div>
      )}

      {children}
    </div>
  );
};

export default AppOverlayLoader;
