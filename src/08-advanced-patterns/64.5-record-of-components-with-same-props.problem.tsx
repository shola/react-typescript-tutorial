import { Equal, Expect } from "../helpers/type-utils";

type InputProps = React.ComponentProps<"input">;

/**
 * All these components take the same props!
 *
 * We don't want to repeat ourselves by typing
 * props: InputProps for each component.
 *
 * There must be a better way!
 *
 * Hint: Record and satisfies will come in handy.
 */
const COMPONENTS = {
  text: (props) => {
    return <input {...props} type="text" />;
  },
  number: (props) => {
    return <input {...props} type="number" />;
  },
  password: (props) => {
    return <input {...props} type="password" />;
  },
} satisfies Record<NonNullable<InputProps["type"]>, React.FC<InputProps>>;

export const Input = (
  props: InputProps & { type: keyof typeof COMPONENTS }
) => {
  const Component = COMPONENTS[props.type];
  return <Component {...props} />;
};

<>
  <Input
    type="number"
    onChange={(e) => {
      // e should be properly typed!
      type test = Expect<Equal<typeof e, React.ChangeEvent<HTMLInputElement>>>;
    }}
  ></Input>
  <Input type="text"></Input>
  <Input type="password"></Input>

  {/* @ts-expect-error */}
  <Input type="email"></Input>
</>;
