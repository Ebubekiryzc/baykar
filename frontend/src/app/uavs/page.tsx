"use client";
import Card from "@/components/Card";
import axiosInstance from "@/lib/axios";
import { FC } from "react";
import { useQuery } from "react-query";

interface UAVListPageProps {}

const fetchData = async () => {
  const response = await axiosInstance.get("uavs/uavs/");
  return response.data;
};

const UAVListPage: FC<UAVListPageProps> = ({}) => {
  const { data, isLoading, isError } = useQuery("uavs", fetchData);

  return isLoading ? null : (
    <main>
      <div className="container">
        <div className="row section-padding">
          {console.log(data)}
          {data &&
            data.count > 0 &&
            // @ts-expect-error
            data.results.map((d, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <Card
                  imageUrl={d.images[0]}
                  manifacturerId={d.uav_manifacturer}
                  categoryId={d.uav_category}
                  slug={d.translations.name}
                  name={d.translations.name}
                  weight={d.weight}
                />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default UAVListPage;
