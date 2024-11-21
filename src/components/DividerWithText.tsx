export default function DividerWithText() {
  return (
    <div className="w-full text-center flex items-center justify-center gap-2">
      <div className="h-[1px] bg-black/20 w-full"></div>
      <span className="uppercase text-xs text-gray-500 min-w-fit">
        Or continue with
      </span>
      <div className="h-[1px] bg-black/20 w-full"></div>
    </div>
  );
}
