import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer } from "@coreui/react";
import routes from "../routes";

const AppContent = () => {
  const token = localStorage.getItem("user_access_valid_token");
  return (
    <CContainer className="px-4" lg>
      <Suspense>
        <Routes>
          {token ? (
            <>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                );
              })}
              <Route path="/" element={<Navigate to="reporting" replace />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="login" replace />} />
          )}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
