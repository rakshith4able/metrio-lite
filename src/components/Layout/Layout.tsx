import { Outlet } from "react-router-dom";
import Header from "components/Layout/Header/Header";
import Footer from "components/Layout/Footer/Footer";
import { StyledMainLayout, StyledMain, StyledLayout } from "./Layout.styles";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout() {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledMainLayout maxWidth={false}>
        <Header />
        <StyledMain>
          <Outlet />
        </StyledMain>
        <Footer />
      </StyledMainLayout>
    </StyledLayout>
  );
}
