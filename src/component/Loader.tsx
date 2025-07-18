"use client";

import { FadeLoader } from "react-spinners";

import styles from "../styles/Home.module.scss";
import useAxiosLoader, { axiosInstanceWithCredential, axiosInstanceWithMultipartFormData, axiosInstanceWithOutCredential } from "@/lib/axios";

type Props = {
  showSuspendLoading?: boolean;
};

function Loader(props: Props) {
  const [axiosWithCredentialLoading] = useAxiosLoader(
    axiosInstanceWithCredential
  );
  const [axiosWithOutCredentialLoading] = useAxiosLoader(
    axiosInstanceWithOutCredential
  );
  const [axiosWithMultiPartheaderLoading] = useAxiosLoader(
    axiosInstanceWithMultipartFormData
  );

  const showLoading =
    axiosWithCredentialLoading ||
    axiosWithOutCredentialLoading ||
    axiosWithMultiPartheaderLoading ||
    props.showSuspendLoading;

  return (
    <>
      {showLoading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderContainer}>
            <FadeLoader
              color="var(--primary-color)" // Using CSS variable
              margin={2}
              speedMultiplier={3}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;
