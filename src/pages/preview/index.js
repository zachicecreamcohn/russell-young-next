import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import CONFIG_VARS from "@/CONFIG_VARS";
import Body from "@/components/Body/Body";
import styles from "./preview.module.css";
import Head from 'next/head';
import Image from "next/image";

function Preview({ metaTags, seriesData }) {
  const [localSeriesData, setLocalSeriesData] = useState(seriesData);
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  useEffect(() => {
    setLocalSeriesData(seriesData);
    console.log("series data has changed");
    console.log(seriesData);
  }, [seriesData]);

  return (
    <Body center>
      {id && !isNaN(id) ? (
        <>
          <Head>
            {metaTags.map((tag, index) => <meta key={index} property={tag.property} content={tag.content} />)}
          </Head>
          <div className={styles.preview}>
            <div className={styles.left}>
              <div className={styles["img-container"]}>
                <img
                  src={localSeriesData.mainImageURL}
                  alt="preview"
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles["info-container"]}>
                <div className={styles.details}>
                  <h1 className={styles.title}>{localSeriesData.title}</h1>
                  <p className={styles["series-name"]}>{localSeriesData.series}</p>
                  <p className={styles.year}>{localSeriesData.year}</p>
                  <p className={styles.description}>
                    {localSeriesData.medium}
                  </p>
                  <p className={styles.size}>{localSeriesData.size}</p>
                </div>
                <div>
                  <div className={styles.availability + styles["semi-available"]}>
                    <p className={styles.status}>
                      {/* On Loan to <a>Zach's Gallery</a> */}
                    </p>
                  </div>
                  <div className={styles.buttons}>
                    <button className={styles.inquire + " theme-design"}>INQUIRE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Invalid childID passed.</p>
      )}
    </Body>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const response = await fetch(process.env.NEXT_ROOT_URL + '/api/childDetails/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  });
  const seriesData = await response.json();

  const title = seriesData[0].title;
  const series = seriesData[0].series;
  const mainImageURL = `${process.env.CLOUDFLARE_ROOT_URL}/${seriesData[0].cloudflare_image_id}/w=500`;
  seriesData[0].mainImageURL = mainImageURL;
  const imageURL = `${process.env.CLOUDFLARE_ROOT_URL}/${seriesData[0].cloudflare_image_id}/w=200`;
  const url = `${CONFIG_VARS.ROOT_URL}${context.req.url}`;

  const metaTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: series },
    { property: "og:image", content: imageURL },
    { property: "og:url", content: url },
 
  ];

  return {
  props: {
  metaTags,
  seriesData: seriesData[0],
  },
  };
  }
  
  export default Preview;