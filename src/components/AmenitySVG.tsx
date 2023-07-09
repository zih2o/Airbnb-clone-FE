interface ISVG {
  path: string;
}
export default function AmenitySVG({ path }: ISVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      height="24px"
      width="24px"
      fill="currentcolor"
      display={'block'}
    >
      <path d={path}></path>
    </svg>
  );
}
