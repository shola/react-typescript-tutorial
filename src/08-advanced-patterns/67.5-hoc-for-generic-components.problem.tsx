import { Router, useRouter } from "fake-external-lib";
import { Equal, Expect } from "../helpers/type-utils";

export const withRouter = <TProps,>(
  Component: (props: TProps) => React.ReactNode
): ((props: Omit<TProps, "router">) => React.ReactNode) => {
  const NewComponent = (props: Omit<TProps, "router">) => {
    const router = useRouter();
    return <Component {...(props as TProps)} router={router} />;
  };

  // TIL React.FC is not recommended, use render functions instead:
  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/
  // NewComponent.displayName = `withRouter(${
  //   (Component as React.FC<TProps>).displayName
  // })`;

  NewComponent.displayname = `withRouter(${
    (
      Component as {
        displayName?: string;
      }
    ).displayName
  })`;

  return NewComponent;
};

type TableProps<T> = {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  router: Router;
};

export const Table = <T,>(props: TableProps<T>) => {
  return <table />;
};

const WrappedTable = withRouter(Table);

<>
  {/* @ts-expect-error router is required! */}
  <Table
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />
</>;
