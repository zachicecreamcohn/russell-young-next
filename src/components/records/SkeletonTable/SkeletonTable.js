import React from "react";
import { useEffect, useState } from "react";
import styles from "./SkeletonTable.module.css";

function SkeletonTable(props) {
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < 15; i++) {
      rows.push(
        <tr key={i}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <table className={styles.table}>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

export default SkeletonTable;
