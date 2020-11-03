import React, { useEffect, useState } from "react";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import historyuser from "../outils/history";
import { getUsers } from "../actions/adminaction";
import { notifications } from "../reducer/notification";
import "../notifications.css";

function Notifications() {
  const dispatch = useDispatch();
  const [countnotif, setCountnotif] = useState(0);
  const allnotif = useSelector((state) => state.notification.notifications);
  let auth = useSelector((state) => state.auth);
  const users=useSelector(state=>state.admin.users)
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  return (
      <> 
      {users.length!=0&&<div id="modalnotifall" style={{ padding: 0, margin:0 }}>


             <div >
              <h4 className="center" style={{ marginTop: "20px" }}>Notifications Center</h4>
            </div>

            <div className="notification-page__content" style={{ marginBottom: "0px" }}>
              <div className="notification-page__content__title">
                <span>Notifications</span>
                </div>
                <div className="notification-page__content__container">
                  <div className="notification-container">
                    <div className="notification-per-period">
                      <div className="notification-per-period__title">
                        <div className="x-flex-column-h-center-v-any ">
                          <span>2020-10-06</span>
                          </div>
                          </div>
                          <div className="notification-per-period__link">
                          {allnotif &&
                    allnotif
                      .slice(0)
                      .reverse()
                      .slice(0, 10 + countnotif * 10)
                      .map((el) => {
                        return (
                            <div key={el._id} className="notification-per-period__period-card">
                              <div className="x-flex-column-h-center-v-any" style={{minWidth: "90px"}}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAQlBMVEVHcEwun+0un+0un+0un+0un+0un+0un+0un+0un+0un+0un+3+//9LrfCx2/h8w/Ti8v04pO5TsPDI5vrF5Pqu2vjMOoLpAAAAC3RSTlMAichYCprR+CTqMrIcawcAAADYSURBVDjLhVNZFoQgDGNHZHO9/1VHrHYA9bVfhYQmQMsYhpJaOGud0FKxZwzaegyrhw5WvIJPCm+qDMY/wlRFRudfwo14/hU/GFcNZfxHGPDB670Y6xU/BSr/MYWQKootIrqFW4o+HNjudFPFKiYhm6vtkzJDLm+FJYQVK8c1hOXWEA9/jYZgrvUYu4s4dnmMWwYKwHm7OBYJU5gKZd8LfCyQgBIZKFUCEgLlAGngYhKvmaA2KKX/NbuHyrl/KPKpyc+iv5tsGLrlyKal254eHHr06OH9Hv8fr7ckO+3gY/cAAAAASUVORK5CYII=" alt="Notification" />
                                  </div>
                                  <div>
                                    <div className="notification-per-period__period-card__type">
                                      <span>{el.title}</span>
                                      </div>
                                      <div className="notification-per-period__period-card__content">{el.content}</div>
                                      <div className="notification-per-period__period-card__date">{historyuser(el.created_at)}</div>
                                      </div></div>
                        )})}
                                      </div>
                                      <p/>
                {(countnotif + 1) * 10 < allnotif.length && (
                  <div
                    style={{
                      position: "abosolute",
                      background: "cadetblue",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black"
                    }}
                    id="loadMore"
                    className="thb-gp-load-more"
                    data-thb-gp-lm-type="event"
                    data-org-text="MORE"
                    onClick={() => {
                      setCountnotif(countnotif + 1);
                    }}
                  >
                    SHOW MORE
                  </div>
                )}
             </div>
             </div>
             </div>
             </div>
        </div>} 
</>
 
    
  );
}

export default Notifications;
