import React, { useState, useEffect } from "react";
import CustomToggle from "@/components/CustomToggle/CustomToggle";
import styles from "./AccessRequests.module.css";
import cx from "classnames";

import { Check, TrashX } from "tabler-icons-react";

function AccessRequests(props) {
  const { alertError, alertSuccess } = props;
  const [accessRequests, setAccessRequests] = useState([]);

  async function fetchData() {
    return fetch("/api/settings/users/getAccessRequests", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        alertError("Error getting access requests. Check console for details.");
        console.error(error);
      });
  }

  useEffect(() => {
    fetchData().then((data) => {
      setAccessRequests(data.data);
    });
  }, []);

  function approveRequest(id) {
    fetch("/api/settings/users/updateAccessRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        approved: true,
      }),
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alertSuccess("Request approved.");
          fetchData().then((data) => {
            setAccessRequests(data.data);
          });
        } else {
          alertError("Error approving request.");
        }
      }
      )
      .catch((error) => {
        alertError("Error approving request. Check console for details.");
        console.error(error);
      }
      );
  }

  function rejectRequest(id) {
    fetch("/api/settings/users/updateAccessRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        approved: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alertSuccess("Request denied.");
          fetchData().then((data) => {
            setAccessRequests(data.data);
          });
        } else {
          alertError("Error denying request.");
        }
      }
      )
      .catch((error) => {
        alertError("Error denying request. Check console for details.");
        console.error(error);
      }
      );
  }

  function formatName(str) {
    const words = str.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Manage Access Requests</p>
        {accessRequests.length == 0 ? (
              <tr>
                <td colSpan={3}><i>NO PENDING REQUESTS</i></td>
              </tr>
            ) : (

        <table className={styles.requests}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            

            {accessRequests.map((request, index) => {
              return (
                <tr key={index}>
                  <td>{formatName(request.name)}</td>
                  <td>{request.email.toLowerCase()}</td>
                  <td className={styles.actions}>
                    <Check
                      size={22}
                      className={cx(styles.action, styles.approve)}
                      onClick={() => approveRequest(request.id)}
                    />
                    <TrashX
                      size={22}
                      className={cx(styles.action, styles.reject)}
                      onClick={() => rejectRequest(request.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>
    </>
  );
}

export default AccessRequests;
