import styles from "@/styles/admindashboard.module.css";
import Link from "next/link";
import { FC } from "react";

interface AdminDashboardProps {}

const AdminDashboard: FC<AdminDashboardProps> = ({}) => {
  return (
    <main className="section-padding">
      <ul className="container">
        <li>
          <Link href="/admin/category" className="fs-5">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/admin/manifacturer" className="fs-5">
            Manifacturers
          </Link>
        </li>
        <li>
          <Link href="/admin/uav" className="fs-5">
            UAVs
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default AdminDashboard;
