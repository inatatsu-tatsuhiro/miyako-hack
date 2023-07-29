import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";

type Props = {
  clickHandler: () => void;
  isDefault: boolean;
};

export const CheckBox: React.FC<Props> = ({ clickHandler, isDefault }) => {
  return (
    <Root>
      <CBRoot onClick={clickHandler} defaultChecked={isDefault}>
        <CBIndicator>
          <CheckIcon />
        </CBIndicator>
      </CBRoot>
    </Root>
  );
};

const Root = styled("div", {});

const CBRoot = styled(Checkbox.Root, {
  background: Color.pureWhite,
  border: `1px solid ${Color.gray}`,
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
});
const CBIndicator = styled(Checkbox.Indicator, {
  background: Color.primary,
  borderRadius: "4px",
  width: "15px",
  height: "15px",
});
