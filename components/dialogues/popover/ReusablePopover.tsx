import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { PopoverPlacement } from "./types/PopoverPlacement";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement: PopoverPlacement;
}

/** Wrapper for NextUI Popover component. An experiment on whether this is a viable pattern or not... */
export default function ReusablePopover({
  trigger,
  content,
  placement,
}: PopoverProps) {
  return (
    <Popover placement={placement} showArrow>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}
