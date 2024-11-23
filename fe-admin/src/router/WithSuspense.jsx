import { Suspense } from "react";

const withSuspense = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `withSuspense(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withSuspense;
