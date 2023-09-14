/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const EmptyState = () => {
  return (
    <div
      className="flex flex-col gap-7 w-full h-full items-center justify-center mt-32"
    >
      <div>
        <b>Ops! </b>
        <p>Looks like you haven't uploaded any files yet!</p>
      </div>
      <Image src='/box.png' alt="Empty box" width={200} height={200} />
    </div>
  );
}

export default EmptyState;