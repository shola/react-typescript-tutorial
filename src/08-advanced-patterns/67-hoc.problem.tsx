import { Router, useRouter } from "fake-external-lib";

export const withRouter = <TProps,>(Component: React.ComponentType<TProps>) => {
  const NewComponent = (props: Omit<TProps, "router">) => {
    const router = useRouter();
    // https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
    return <Component {...(props as TProps)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};

const UnwrappedComponent = (props: { router: Router; id: string }) => {
  return null;
};

const WrappedComponent = withRouter(UnwrappedComponent);

<>
  {/* @ts-expect-error needs a router! */}
  <UnwrappedComponent id="123" />

  {/* Doesn't need a router passed in! */}
  <WrappedComponent id="123" />

  <WrappedComponent
    // @ts-expect-error id must be the correct property
    id={123}
  />
</>;
