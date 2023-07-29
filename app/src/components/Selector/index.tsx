import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";

type Navigation = {
  state: string;
  label: string;
  action: () => void;
};

type Props = {
  navigations: Navigation[];
  currentState: string;
};
export const Selector: React.FC<Props> = ({ navigations, currentState }) => {
  return (
    <Root>
      {navigations.map((navi, index) => {
        const position = (() => {
          if (index === 0) {
            return "left";
          } else if (index === navigations.length - 1) {
            return "right";
          } else {
            return "center";
          }
        })();

        return (
          <Item
            key={navi.label}
            isActive={navi.state === currentState}
            onClick={navi.action}
            position={position}
          >
            {navi.label}
          </Item>
        );
      })}
    </Root>
  );
};
const Root = styled("div", {
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
});

const Item = styled("div", {
  width: "60px",
  height: "32px",
  color: Color.text,
  borderBottom: `1px solid`,
  cursor: "pointer",

  display: "grid",
  placeItems: "center",

  background: Color.pureWhite,

  "&:hover": {
    background: Color.lightGray,
  },
  variants: {
    isActive: {
      true: {
        borderColor: Color.primary,
      },
      false: {
        borderColor: Color.gray,
      },
    },

    position: {
      left: {
        borderRadius: "4px 0px 0px 4px",
      },
      center: {},
      right: {
        borderRadius: "0px 4px 4px 0px",
      },
    },
  },
});
