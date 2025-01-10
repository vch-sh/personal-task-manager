export default function DividerWithText() {
  return (
    <div className="flex w-full items-center justify-center gap-2 text-center">
      <div className="h-[1px] w-full bg-black/20"></div>
      <span className="min-w-fit text-xs uppercase text-gray-600">
        Or continue with
      </span>
      <div className="h-[1px] w-full bg-black/20"></div>
    </div>
  );
}
