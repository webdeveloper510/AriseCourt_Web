import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer } from "@coreui/react";
import routes from "../routes";

const AppContent = () => {
  const token = localStorage.getItem("user_access_valid_token");

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {token ? (
            <>
              {routes.map((route, idx) => {
                const Component = route.element; // ✅ assign element
                return Component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<Component />} // ✅ render correctly
                  />
                ) : null;
              })}
              {/* Default redirect after login */}
              <Route path="/" element={<Navigate to="/reporting" replace />} />
            </>
          ) : (
            // If no token → go to login
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
