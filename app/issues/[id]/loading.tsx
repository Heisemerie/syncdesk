import { Flex, Card, Skeleton } from "@radix-ui/themes";

const loading = () => {
  return (
    <div className="max-w-4xl">
      <Skeleton height="20px" width='100px'/>
      <Flex className="gap-3 my-2">
        <Skeleton width="4rem" height="20px" />
        <Skeleton width="8rem" height="20px" />
      </Flex>
      <Card className="prose dark:prose-invert max-w-full">
        <Skeleton height="20px" className="my-2" />
        <Skeleton height="20px" className="my-2" />
        <Skeleton height="20px" className="my-2" />
      </Card>
    </div>
  );
};

export default loading;
