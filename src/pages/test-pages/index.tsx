import { Navigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const Test = () => {
  return (
    <MenuLayout>
      <Navigate to="/test-pages/basics" replace />
    </MenuLayout>
  );
};

export default Test;
