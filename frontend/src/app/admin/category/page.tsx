"use client";
import AdminRemoveObject from "@/components/AdminRemoveObject";
import axiosInstance from "@/lib/axios";
import { formatDateTime, getLocalStorageItem } from "@/lib/utils";
import styles from "@/styles/uavadmin.module.css";
import Link from "next/link";
import { FC } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";

interface CategoryAdminPageProps {}

const fetchData = async () => {
  const response = await axiosInstance.get("uavs/uav-categories/");
  return response.data;
};

const CategoryAdminPage: FC<CategoryAdminPageProps> = ({}) => {
  const { data, isLoading, isError } = useQuery("categories", fetchData);
  const removeCategory = async (id: number) => {
    const { data } = await axiosInstance.delete(`uavs/uav-categories/${id}/`, {
      headers: {
        Authorization: "JWT " + getLocalStorageItem("access_token", null),
      },
    });
    return data;
  };
  return isLoading ? null : (
    <>
      <main className="section-padding">
        <table
          className={`container table table-hover text-center ${styles.colorOptimized}`}
        >
          <thead className={styles.colorOptimized}>
            <tr>
              <th scope="col" className={styles.colorOptimized}>
                # ID
              </th>
              <th scope="col" className={styles.colorOptimized}>
                Name
              </th>
              <th scope="col" className={styles.colorOptimized}>
                Slug
              </th>
              <th scope="col" className={styles.colorOptimized}>
                Created At
              </th>
              <th scope="col" className={styles.colorOptimized}>
                Updated At
              </th>
              <th scope="col" className={styles.colorOptimized}>
                Actions
              </th>
              <th scope="col" className={styles.colorOptimized}>
                <Link
                  href="/admin/category/create"
                  className="btn btn-success d-flex align-items-center justify-content-center w-50"
                >
                  <FaPlus />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* @ts-expect-error */}
            {data.map((d, index) => {
              const handleRemove = () => {
                removeCategory(d.id);
              };

              return (
                <tr key={d.id}>
                  <td className={styles.colorOptimized}>{d.id}</td>
                  <td className={styles.colorOptimized}>
                    {d.translations[getLocalStorageItem("lang", "en")].name}
                  </td>
                  <td className={styles.colorOptimized}>
                    {d.translations[getLocalStorageItem("lang", "en")].slug}
                  </td>
                  <td className={styles.colorOptimized}>
                    {formatDateTime(new Date(d.created_at))}
                  </td>
                  <td className={styles.colorOptimized}>
                    {formatDateTime(new Date(d.updated_at))}
                  </td>
                  <td
                    key={d.id}
                    className={`d-flex justify-content-center align-items-center gap-2 ${styles.colorOptimized}`}
                  >
                    <Link
                      href={`/admin/category/
                      ${
                        d.translations[getLocalStorageItem("lang", "en")].slug.trim()
                      }/update`}
                      className="px-3 py-2 rounded bg-warning text-light d-flex align-items-center justify-content-center"
                    >
                      <FaEdit />
                    </Link>
                    <AdminRemoveObject
                      key={index}
                      title={`${d.id}`}
                      id={d.id}
                      removeFn={handleRemove}
                    />
                  </td>
                  <td className={styles.colorOptimized}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default CategoryAdminPage;
