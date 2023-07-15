"use client";
import axiosInstance from "@/lib/axios";
import generateSlug from "@/lib/slugify";
import { getLocalStorageItem } from "@/lib/utils";
import { Manifacturer } from "@/models/manifacturer";
import styles from "@/styles/uavadmincreate.module.css";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useQuery } from "react-query";

interface ManifacturerAdminCreatePageProps {}

const fetchManifacturers = async () => {
  const response = await axiosInstance.get<Array<Manifacturer>>(
    "uavs/uav-manifacturers-without-parent/"
  );
  return response.data;
};

const ManifacturerAdminCreatePage: FC<
  ManifacturerAdminCreatePageProps
> = ({}) => {
  const router = useRouter();
  const { data: manifacturers, isLoading: isLoadingManifacturers } = useQuery(
    "manifacturers",
    fetchManifacturers
  );

  const initialFormData = Object.freeze({
    nameEn: "",
    nameTr: "",
    parent: undefined,
  });
  const [formData, setFormData] = useState(initialFormData);
  // @ts-expect-error
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // @ts-expect-error
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nameEn.length <= 0 || formData.nameTr.length <= 0) {
      return;
    }

    axiosInstance
      .post(
        `uavs/uav-manifacturers/`,
        {
          translations: {
            en: {
              name: formData.nameEn,
              slug: generateSlug(
                formData.parent
                  ? formData.parent + " > " + formData.nameEn
                  : formData.nameEn
              ),
            },
            tr: {
              name: formData.nameTr,
              slug: generateSlug(
                formData.parent
                  ? formData.parent + " > " + formData.nameTr
                  : formData.nameTr
              ),
            },
          },
          parent: formData.parent,
        },
        {
          headers: {
            Authorization: `JWT ${getLocalStorageItem("access_token", null)}`,
          },
        }
      )
      .then((res) => {
        router.push("/admin/manifacturer/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoadingManifacturers ? null : (
    <main className="section-padding">
      <div className="container d-flex flex-column gap-3 align-items-center justify-content-center w-100 h-100">
        <h1
          className={`text-align-left fs-1 flex-shrink-1 fw-bold ${styles.formTitle}`}
        >
          Create Manifacturer
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="form"
        >
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="nameEn"
              placeholder="name"
              name="nameEn"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="nameEn">English Name</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="nameTr"
              placeholder="name"
              name="nameTr"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="nameTr">Turkish Name</label>
          </div>
          <select
            defaultValue={""}
            className="form-select mb-4"
            aria-label="Manifacturers"
            name="parent"
            onChange={(e) => handleChange(e)}
          >
            <option value={""}>Select a parent if exists</option>
            {manifacturers!.map((manifacturer, index) => (
              <option value={manifacturer.id} key={index}>
                {manifacturer.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn btn-success d-flex w-100 justify-content-center align-items-center"
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
};

export default ManifacturerAdminCreatePage;
