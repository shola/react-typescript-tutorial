import { Equal, Expect } from "../helpers/type-utils";

// Commented out because it makes the whole repo slow to typecheck
// Uncomment to see it working!

// This gets a union of all the possible values for `as`,
// combined with the matching attributes. This type is a massive
// union type, that's why it's slow. This works, but is not efficient
// in typescript and should be avoided.
type AsProps = {
  [K in keyof JSX.IntrinsicElements]: {
    as: K;
  } & JSX.IntrinsicElements[K];
}[keyof JSX.IntrinsicElements];

export const Wrapper = (props: AsProps) => {
  const Comp = props.as;
  return <Comp {...(props as any)}></Comp>;
};

/**
 * Should work specifying a 'button'
 */

const Example1 = () => {
  return (
    <>
      <Wrapper
        as="button"
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Wrapper>

      <Wrapper
        as="button"
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<
            Equal<typeof e, React.MouseEvent<HTMLButtonElement>>
          >;
        }}
      ></Wrapper>
    </>
  );
};

/**
 * Should work specifying a 'div'
 */

const Example2 = () => {
  return (
    <>
      <Wrapper
        as="div"
        // @ts-expect-error doesNotExist is not a valid prop
        doesNotExist
      ></Wrapper>

      <Wrapper
        as="div"
        // e should be inferred correctly
        onClick={(e) => {
          type test = Expect<Equal<typeof e, React.MouseEvent<HTMLDivElement>>>;
        }}
      ></Wrapper>
    </>
  );
};
