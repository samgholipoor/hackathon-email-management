/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMemo } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import routes from "@/router";
import ErrorLayout from "@/layouts/ErrorLayout";
import ErrorBoundary from "@/services/errorBoundary.jsx";
import { OverlaysProvider } from "@/components/Modal.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ErrorBoundary>
          <OverlaysProvider>
            <Routes>{RoutesGenerator()}</Routes>
          </OverlaysProvider>
        </ErrorBoundary>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default RouterView;
