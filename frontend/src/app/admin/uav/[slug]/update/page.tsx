"use client";
import axiosInstance from "@/lib/axios";
import generateSlug from "@/lib/slugify";
import { getLocalStorageItem } from "@/lib/utils";
import { Category } from "@/models/category";
import { Manifacturer } from "@/models/manifacturer";
import styles from "@/styles/uavadminupdate.module.css";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useQuery } from "react-query";

interface UAVAdminUpdatePageProps {
  params: {
    slug: string;
  };
}

const fetchData = async (slug: string) => {
  const response = await axiosInstance.get(`uavs/uavs/${slug}`);
  return response.data;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get<Array<Category>>(
    "uavs/uav-categories/"
  );
  return response.data;
};

const fetchManifacturers = async () => {
  const response = await axiosInstance.get<Array<Manifacturer>>(
    "uavs/uav-manifacturers/"
  );
  return response.data;
};

const UAVAdminUpdatePage: FC<UAVAdminUpdatePageProps> = ({ params }) => {
  const router = useRouter();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    fetchCategories
  );
  const { data: manifacturers, isLoading: isLoadingManifacturers } = useQuery(
    "manifacturers",
    fetchManifacturers
  );
  const { data: uav, isLoading: isUAVLoading } = useQuery("uav-details", () =>
    fetchData(params.slug)
  );

  const initialFormData = Object.freeze({
    nameEn: "",
    nameTr: "",
    descriptionEn: "",
    descriptionTr: "",
    weight: "",
    category: "",
    manifacturer: "",
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

    if (
      formData.nameEn.length <= 0 ||
      formData.nameTr.length <= 0 ||
      formData.descriptionEn.length <= 0 ||
      formData.descriptionTr.length <= 0
    ) {
      return;
    }

    axiosInstance
      .put(
        `uavs/uavs/${uav.id}`,
        {
          translations: {
            en: {
              name: formData.nameEn,
              description: formData.descriptionEn,
              slug: generateSlug(formData.nameEn),
            },
            tr: {
              name: formData.nameTr,
              description: formData.descriptionTr,
              slug: generateSlug(formData.nameTr),
            },
          },
          uav_manifacturer: Number.parseInt(formData.manifacturer),
          uav_category: Number.parseInt(formData.category),
          weight: formData.weight,
        },
        {
          headers: {
            Authorization: `JWT ${getLocalStorageItem("access_token", null)}`,
          },
        }
      )
      .then((res) => {
        router.push("/admin/uav/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return isLoadingCategories ||
    isLoadingManifacturers ||
    isUAVLoading ? null : (
    <main className="section-padding">
      <div className="container d-flex flex-column gap-3 align-items-center justify-content-center w-100 h-100">
        <h1
          className={`text-align-left fs-1 flex-shrink-1 fw-bold ${styles.formTitle}`}
        >
          Update UAV
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="d-flex gap-4">
            <div className="form-floating mb-4">
              <input
                type="text"
                className={`form-control ${styles.userInput}`}
                id="nameEn"
                placeholder="Name"
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
                placeholder="Name"
                name="nameTr"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="nameTr">Turkish Name</label>
            </div>
          </div>

          <div className="d-flex gap-4">
            <div className="form-floating mb-4">
              <textarea
                className={`form-control ${styles.userInput}`}
                id="descriptionEn"
                cols={23}
                placeholder="Description"
                name="descriptionEn"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="descriptionEn">English Description</label>
            </div>
            <div className="form-floating mb-4">
              <textarea
                className={`form-control ${styles.userInput}`}
                cols={23}
                id="descriptionTr"
                placeholder="Description"
                name="descriptionTr"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="descriptionTr">Turkish Description</label>
            </div>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="weight"
              placeholder="Weight"
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="weight">Weight</label>
          </div>
          <select
            defaultValue={""}
            className="form-select mb-4"
            aria-label="Categories"
            placeholder="Weight"
            name="category"
            onChange={(e) => handleChange(e)}
          >
            <option value={""}>Please select a category</option>
            {categories!.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            defaultValue={""}
            className="form-select mb-4"
            aria-label="Manifacturers"
            name="manifacturers"
            onChange={(e) => handleChange(e)}
          >
            <option value={""}>Please select a manifacturer</option>
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

export default UAVAdminUpdatePage;
