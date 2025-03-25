import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { HeaderAdmin } from "./HeaderAdmin/HeaderAdmin";
import { LeftMenuAdmin } from "./LeftMenuAdmin/LeftMenuAdmin";

export const Admin = () => {
  return (
    <div className="container_main_admin">
      <HeaderAdmin />
      <div className="container_inner_admin">
        <LeftMenuAdmin />

        <section className="section_admin">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
