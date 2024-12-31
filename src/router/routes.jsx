/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "@/router";
import ErrorLayout from "@/layouts/ErrorLayout";
import ErrorBoundary from "@/services/errorBoundary";

const RoutesGenerator = () => {
  const appRoutesList = useMemo(() => {
    return routes.map((route) => {
      const { path, component: Component } = route;

      const element = <Component />;

      return <Route key={path} path={path} element={element} />;
    });
  }, [routes]);

  appRoutesList.push(
    <Route
      key="*"
      path="*"
      element={<ErrorLayout code={404} message="صفحه‌ی مورد نظر یافت نشد" />}
    />
  );

  return appRoutesList;
};

function RouterView() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>{RoutesGenerator()}</Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default RouterView;
