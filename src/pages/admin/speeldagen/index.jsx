"use client";
import BaseLayout from "@/components/layout/BaseLayout";
import AdminPopup from "@/components/Popup";
import "@/app/styles/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "reactjs-popup/dist/index.css";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
import WedstrijdForm from "@/components/admin/speeldag/CreateWedstrijd";
import WedstrijdAdmin from "@/components/admin/wedstrijd/wedstrijdAdmin";

import {
  getSpeeldagen,
} from "../../../components/api_calls/call";
import React, { useState, useEffect } from "react";

export default function Speeldagen() {
  const [speeldagen, setSpeeldagen] = useState([]);

  useEffect(() => {
    getSpeeldagen()
      .then((fetchedSpeeldagen) => {
        console.log(fetchedSpeeldagen);
        setSpeeldagen(fetchedSpeeldagen);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  const router = useRouter();
  const maakSpeeldagClick = () => {
    console.log("maakSpeeldagClick");
    router.push("/admin/speeldagen/CreateSpeeldag");
  };

  return (
    <BaseLayout>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <AdminPopup
        popupContent={SpeelDagForm()}
        triggerButtonName="nieuw Speeldag"
      />
      <div className="speeldag">
        <ul>
          {speeldagen.map((speeldag, index) => (
            <li key={speeldag._id}>
              <div className="speeldagHead">
                <h2>Speeldag {1 + index}</h2>
                <AdminPopup
                  popupContent={SpeelDagForm({
                    schiftingsvraag: "vraag",
                    schiftingsantwoord: "antwoord",
                  })}
                  triggerButtonName="pas aan"
                />
                <AdminPopup
                  popupContent={WedstrijdForm(speeldag._id)}
                  triggerButtonName="Nieuwe wedstrijd"
                />
              </div>

              <WedstrijdAdmin
                wedstrijden={speeldag.wedstrijden}
              ></WedstrijdAdmin>
            </li>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
}
