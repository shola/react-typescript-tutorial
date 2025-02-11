/**
 * The 'as' prop is notorious for being difficult to type correctly.
 *
 * Here, we've created a component that takes an 'as' prop. The 'as' prop
 * is a string representing the HTML tag to render. The component will
 * render that tag, and pass all the other props through.
 *
 * BUT currently the types of the props that go along with the 'as' prop
 * are not inferred correctly.
 *
 * I've found two solutions. The first uses an IIMT:
 *
 * https://www.totaltypescript.com/immediately-indexed-mapped-type
 *
 * The second uses a generic type.
 *
 * Both solutions make use of:
 *
 * - JSX.IntrinsicElements
 * - keyof
 * - 'as'
 * - Indexed access types
 */

import { Equal, Expect } from "../helpers/type-utils";

// This joins the value for each possible value of `as` with
// the matching component props. This is lightweight and preferred.
type WrapperProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
} & React.ComponentProps<T>;

export const Wrapper = <T extends keyof JSX.IntrinsicElements>(
  props: WrapperProps<T>
) => {
  const Comp = props.as;

  // I thought that I could type assert Wrapper<T> but that doesn't work.
  // There's no escaping asserting props as `any` in HOC sometimes (all the time?)
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
