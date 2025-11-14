import { Skeleton } from "@radix-ui/themes";

const loading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height="20px" className="my-2" />
      <Skeleton height="20rem" className="my-2" />
    </div>
  );
};

export default loading;
