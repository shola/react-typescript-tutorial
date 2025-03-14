import { ForwardedRef, forwardRef, useRef } from "react";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Using the forward-ref-with-generics explanation as a guide,
 * give fixedForwardRef a type signature that allows it to
 * work with the example below.
 */
function fixedForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any;
}

type Props<Row> = {
  data: Row[];
  renderRow: (item: Row) => React.ReactNode;
};

export const Table = <Row,>(
  props: Props<Row>,
  ref: ForwardedRef<HTMLTableElement>
) => {
  return <table ref={ref} />;
};

const ForwardReffedTable = fixedForwardRef(Table);

const Parent = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const wrongRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <ForwardReffedTable
        ref={tableRef}
        data={["123"]}
        renderRow={(row) => {
          type test = Expect<Equal<typeof row, string>>;
          return <div>123</div>;
        }}
      />
      <ForwardReffedTable
        // @ts-expect-error
        ref={wrongRef}
        data={["123"]}
        renderRow={(row) => {
          return <div>123</div>;
        }}
      />
    </>
  );
};
