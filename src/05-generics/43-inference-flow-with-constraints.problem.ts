import { createUser } from "fake-external-lib";
import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

// Note that TArgs must extend `any[]`, and not `any`. Typescript tries to infer
// the singular generic type, but resolves to Parameters instead of a type.
type Mutation<TArgs extends any[], TResp> = (...args: TArgs) => Promise<TResp>;

interface UseMutationReturn<TArgs extends any[], TResp> {
  mutate: Mutation<TArgs, TResp>;
  isLoading: boolean;
}

interface UseMutationOptions<TArgs extends any[], TResp> {
  mutation: Mutation<TArgs, TResp>;
}

export const useMutation = <TArgs extends any[], TResp>(
  opts: UseMutationOptions<TArgs, TResp>
): UseMutationReturn<TArgs, TResp> => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: async (...args) => {
      setIsLoading(true);

      try {
        const result = await opts.mutation(...args);
        return result;
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
  };
};

const mutation = useMutation({
  mutation: createUser,
});

mutation.mutate({ name: "John Doe", email: "john@doe.com" });

// @ts-expect-error email missing!
mutation.mutate({ name: "John Doe" });

mutation.mutate(
  {
    name: "John Doe",
    email: "john@doe.com",
  },
  {
    throwOnError: true,
    // @ts-expect-error extra prop
    extra: "oh dear",
  },
);

type test = [
  Expect<Equal<typeof mutation.isLoading, boolean>>,
  Expect<
    Equal<
      typeof mutation.mutate,
      (
        user: { name: string; email: string },
        opts?: {
          throwOnError?: boolean;
        },
      ) => Promise<{
        id: string;
        name: string;
        email: string;
      }>
    >
  >,
];
