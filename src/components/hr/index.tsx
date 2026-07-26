import { tw } from "@utils/tailwind";

interface HrProps {
  className?: string;
  marginTop?: string;
  marginBottom?: string;
  height?: string;
  width?: string;
  bgColor?: string;
}

const Hr = ({
  className = "",
  marginTop = "mt-16",
  marginBottom = "mb-8",
  height = "h-px",
  width = "w-full",
  bgColor = "bg-grey-200",
}: HrProps) => {
  return (
    <div
      className={tw`custom:divider ${marginTop} ${marginBottom} ${height} ${width} ${bgColor} ${className}`}
    />
  );
};

export default Hr;
