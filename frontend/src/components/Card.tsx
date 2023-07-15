"use client";
import axiosInstance from "@/lib/axios";
import { Category } from "@/models/category";
import { Manifacturer } from "@/models/manifacturer";
import styles from "@/styles/card.module.css";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useQuery } from "react-query";

interface CardProps {
  imageUrl: string;
  slug: string;
  name: string;
  manifacturerId: number;
  categoryId: number;
  weight: number;
}

const fetchCategoryById = async (id: number) => {
  const response = await axiosInstance.get<Category>(
    `uavs/uav-categories/${id}/`
  );
  return response.data;
};

const fetchManifacturerById = async (id: number) => {
  const response = await axiosInstance.get<Manifacturer>(
    `uavs/uav-manifacturers/${id}/`
  );
  return response.data;
};

const Card: FC<CardProps> = ({
  imageUrl,
  slug,
  name,
  manifacturerId,
  categoryId,
  weight,
}) => {
  const { data: category, isLoading: isLoadingCategory } = useQuery(
    "category",
    () => fetchCategoryById(categoryId)
  );
  const { data: manifacturer, isLoading: isLoadingManifacturer } = useQuery(
    "manifacturers",
    () => fetchManifacturerById(manifacturerId)
  );
  return isLoadingCategory || isLoadingManifacturer ? null : (
    <div className={styles.customCard}>
      <div className={styles.customCardContent}>
        <div className={styles.imageContent}>
          {imageUrl ? (
            <Image fill className={styles.image} src={imageUrl} alt="" />
          ) : (
            <Image fill className="object-fit-cover" src="/default.png" alt="" />
          )}
        </div>
        <div className={styles.textContent}>
          <h1 className={styles.title}>{name}</h1>
          <small className={styles.smallText}>
            <em>{manifacturer!.fullname}</em>
          </small>
          <div className={styles.category}>
            <strong className={styles.boldText}>Category:</strong>{" "}
            <span>{category!.name}</span>
          </div>
          <div className={styles.weight}>
            <strong className={styles.boldText}>Weight:</strong>{" "}
            <span>{weight}</span>
          </div>
          <Link
            href={`/uavs/${slug}`}
            className="btn btn-primary mt-3 d-flex align-items-center justify-content-center gap-3"
          >
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
