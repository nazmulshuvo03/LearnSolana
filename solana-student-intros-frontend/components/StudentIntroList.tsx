import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { StudentIntro } from "../models/StudentIntro";
import * as web3 from "@solana/web3.js";
import { StudentCoordinator } from "../Coordinator/StudentCoordinator";

const STUDENT_INTRO_PROGRAM_ID = "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([]);
    const [page, setPage] = useState(75);
    const [search, setSearch] = useState("");

    useEffect(() => {
        StudentCoordinator.fetchpage(
            connection,
            page,
            5,
            search,
            search !== ""
        ).then(setStudentIntros);
    }, [page, search]);

    return (
        <div>
            <div>
                <input
                    type={"text"}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Search..."}
                />
            </div>
            {studentIntros.length ? (
                studentIntros.map((studentIntro, i) => (
                    <Card key={i} studentIntro={studentIntro} />
                ))
            ) : (
                <div style={{ color: "#fcfcfc" }}>There is none left</div>
            )}
            <div>
                <button
                    onClick={() =>
                        setPage((prev) => (studentIntros.length ? prev + 1 : 1))
                    }
                    style={{
                        backgroundColor: "#fcfcfc",
                        padding: "6px 20px",
                        margin: "10px 0"
                    }}
                >
                    {studentIntros.length ? `Go to page: ${page + 1}` : "Reset"}
                </button>
            </div>
        </div>
    );
};
