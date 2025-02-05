const Component = (props: { config: {} }) => {
  return <div />;
};

/**
 * Why can I pass _anything_ to config?
 * 
 * Because the type of empty object is any object type, except for null
 */
<>
  <Component
    config={{
      foo: "bar",
      whatever: {},
    }}
  />
</>;
