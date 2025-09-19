"use client";

import type { FC, ReactNode } from "react";
import {
    ArrowUpRight,
    BadgeCheck,
    Briefcase,
    DollarSign,
    MoreVertical,
    PlusCircle,
    Users,
} from "lucide-react";
import Link from "next/link";
import styles from "./dashboard.module.css"; // import CSS module

// --- TYPE DEFINITIONS ---
type Stat = {
    title: string;
    value: string;
    icon: ReactNode;
    change: string;
};

type JobStatus = "Active" | "Interviewing" | "Needs Candidates" | "Closed";

type Job = {
    id: string;
    title: string;
    department: string;
    candidates: number;
    status: JobStatus;
};

type Activity = {
    id: string;
    candidate: {
        name: string;
        avatarUrl: string;
    };
    jobTitle: string;
    score: number;
    stage: string;
    timestamp: string;
};

interface DashboardData {
    stats: Stat[];
    activeJobs: Job[];
    recentActivity: Activity[];
}

// --- MOCK DATA ---
const DASHBOARD_DATA: DashboardData = {
    stats: [
        {
            title: "Open Positions",
            value: "12",
            icon: <Briefcase size={20} />,
            change: "+2 this month",
        },
        {
            title: "Candidates Screened",
            value: "84",
            icon: <Users size={20} />,
            change: "+15.2% from last month",
        },
        {
            title: "Avg. Interview Score",
            value: "8.2 / 10",
            icon: <BadgeCheck size={20} />,
            change: "+0.3 from last month",
        },
        {
            title: "Hiring Cost",
            value: "$5,420",
            icon: <DollarSign size={20} />,
            change: "↓ 5% from budget",
        },
    ],
    activeJobs: [
        { id: "JOB001", title: "Senior Frontend Developer", department: "Engineering", candidates: 25, status: "Active" },
        { id: "JOB002", title: "UX/UI Designer", department: "Product", candidates: 12, status: "Active" },
        { id: "JOB003", title: "DevOps Engineer", department: "Engineering", candidates: 8, status: "Needs Candidates" },
        { id: "JOB004", title: "Product Manager", department: "Product", candidates: 32, status: "Interviewing" },
    ],
    recentActivity: [
        { id: "ACT001", candidate: { name: "Olivia Martin", avatarUrl: "/avatars/01.png" }, jobTitle: "Senior Frontend Developer", score: 9.1, stage: "AI Screening", timestamp: "2 hours ago" },
        { id: "ACT002", candidate: { name: "Liam Anderson", avatarUrl: "/avatars/02.png" }, jobTitle: "UX/UI Designer", score: 8.5, stage: "Final Review", timestamp: "8 hours ago" },
        { id: "ACT003", candidate: { name: "Noah Wilson", avatarUrl: "/avatars/03.png" }, jobTitle: "Product Manager", score: 7.8, stage: "AI Screening", timestamp: "1 day ago" },
        { id: "ACT004", candidate: { name: "Emma Garcia", avatarUrl: "/avatars/04.png" }, jobTitle: "DevOps Engineer", score: 9.4, stage: "AI Screening", timestamp: "2 days ago" },
    ],
};

// --- COMPONENTS ---
const StatCard: FC<Stat> = ({ title, value, icon, change }) => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <span>{title}</span>
            {icon}
        </div>
        <div className={styles.cardContent}>
            <strong>{value}</strong>
            <p>{change}</p>
        </div>
    </div>
);

const RecruiterDashboard: FC = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome back, Recruiter!</h1>
                <Link href="/jobs/create" className={styles.primaryBtn}>
                    <PlusCircle size={18} /> Create New Job
                </Link>
            </header>

            {/* Stats */}
            <div className={styles.statsGrid}>
                {DASHBOARD_DATA.stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Jobs & Activity */}
            <div className={styles.mainGrid}>
                {/* Jobs */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Active Jobs</h2>
                        <Link href="/jobs" className={styles.linkBtn}>
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Candidates</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {DASHBOARD_DATA.activeJobs.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <strong>{job.title}</strong>
                                    <div className={styles.subtext}>{job.department}</div>
                                </td>
                                <td>{job.candidates}</td>
                                <td>{job.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Activity */}
                <div className={styles.card}>
                    <h2>Recent Activity</h2>
                    <div className={styles.activityList}>
                        {DASHBOARD_DATA.recentActivity.map((activity) => (
                            <div key={activity.id} className={styles.activityItem}>
                                <img src={activity.candidate.avatarUrl} alt={activity.candidate.name} className={styles.avatar} />
                                <div>
                                    <p>
                                        <strong>{activity.candidate.name}</strong> interviewed for <em>{activity.jobTitle}</em>
                                    </p>
                                    <small>{activity.timestamp} — Score: {activity.score}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;

