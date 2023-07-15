"use client";
import axiosInstance from "@/lib/axios";
import styles from "@/styles/uavdetails.module.css";
import Image from "next/image";
import { FC } from "react";
import { FaDollarSign } from "react-icons/fa";
import { useQuery } from "react-query";
import { DateRangePicker } from "rsuite";

interface UAVDetailProps {
  params: {
    uavSlug: string;
  };
}

const fetchData = async (slug: string) => {
  const response = await axiosInstance.get(`uavs/uavs/${slug}`);
  return response.data;
};

const UAVDetail: FC<UAVDetailProps> = ({ params }) => {
  const { data, isLoading, isError } = useQuery("uav-details", () =>
    fetchData(params.uavSlug)
  );

  return isLoading ? null : (
    <main>
      <div
        className={`container d-flex align-items-center gap-5 justify-content-center w-100 h-100 ${styles.mainContainer}`}
      >
        <div className={`rounded ${styles.imageContent}`}>
          {data && data.images[0] ? (
            <Image fill src={data.images[0]} alt="" className={styles.image} />
          ) : (
            <Image
              fill
              src="/default.png"
              alt=""
              className="object-fit-cover"
            />
          )}
        </div>
        <div className={styles.textContent}>
          <div className="list-group w-100 h-100 d-flex flex-column">
            <div className={`list-group-item fs-3 ${styles.item}`}>
              {data.name}
            </div>
            <div className={`list-group-item ${styles.item}`}>
              <strong>Brand:</strong> <span>{data.uav_manifacturer}</span>
            </div>
            <div className={`list-group-item ${styles.item}`}>
              <strong>Category:</strong> <span>{data.uav_category}</span>
            </div>
            <div className={`list-group-item ${styles.item}`}>
              <strong>Weight:</strong> <span>{data.weight}</span>
            </div>
            <div className={`list-group-item ${styles.item}`}>
              <strong>Description:</strong>
              <br />
              <br />
              <span className={styles.description}>{data.description}</span>
            </div>
            <div className={`mt-3 d-flex gap-5 w-100 ${styles.rentContent}`}>
              <DateRangePicker appearance="subtle" />
              <button className="btn btn-success w-100 d-flex align-items-center gap-2 justify-content-center">
                <FaDollarSign />
                <span>Rent</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UAVDetail;
