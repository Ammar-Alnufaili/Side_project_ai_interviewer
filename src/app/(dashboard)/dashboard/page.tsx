"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    ChevronRight,
    FileText,
    Settings,
    PlayCircle,
} from "lucide-react";

/* =======================================
 * Types & helpers
 * =======================================
 */
export type Interview = {
    id: number;
    title: string; // e.g., "Senior Frontend Developer"
    description: string;
    color: string;
    category: "behavioral" | "technical";
};

const makeRowKey = (i: Interview) => `${i.id}`;
const cx = (...xs: Array<string | false | null | undefined>) =>
    xs.filter(Boolean).join(" ");

/* =======================================
 * Component
 * =======================================
 */
export default function DashboardInterviews() {
    const router = useRouter();

    // Data state
    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // UI state
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCat, setActiveCat] =
        useState<"all" | "behavioral" | "technical">("all");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Fetch interviews
    const fetchInterviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/interviews");
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const data = await res.json();
            setInterviews(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setError(e?.message || "Failed to load interviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    // Derived list
    const filteredInterviews = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return interviews
            .filter((i) => (activeCat === "all" ? true : i.category === activeCat))
            .filter(
                (i) =>
                    i.title.toLowerCase().includes(q) ||
                    i.description.toLowerCase().includes(q)
            )
            .sort((a, b) => a.title.localeCompare(b.title));
    }, [interviews, searchQuery, activeCat]);

    // Collapse if expanded item no longer visible
    useEffect(() => {
        if (!expandedKey) return;
        const exists = filteredInterviews.some((i) => makeRowKey(i) === expandedKey);
        if (!exists) setExpandedKey(null);
    }, [filteredInterviews, expandedKey]);

    const toggleExpand = (rowKey: string) => {
        setExpandedKey((prev) => (prev === rowKey ? null : rowKey));
    };

    const deleteInterview = async () => {
        if (!deletingId) return;
        await fetch("/api/interviews", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: deletingId }),
        });
        setShowConfirm(false);
        setDeletingId(null);
        await fetchInterviews();
    };

    const listContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    } as const;

    const cardItem = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 24 },
        },
    } as const;

    const hasTechnical = interviews.some((i) => i.category === "technical");

    /* =======================================
     * UI
     * =======================================
     */
    return (
        <div className="min-h-screen bg-[#f5f8fe] px-4 py-10 sm:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">My Interviews</h1>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search interviews…"
                            className="w-72 rounded-xl border bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                </div>

                {/* Create Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/interviews/create")}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" /> Create New Interview
                </motion.button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1 text-sm text-gray-500">
          <Filter className="h-4 w-4" /> Filter:
        </span>

                {(["all", "behavioral"] as const).map((c) => (
                    <button
                        key={c}
                        onClick={() => setActiveCat(c)}
                        className={cx(
                            "rounded-full border px-3 py-1.5 text-sm transition",
                            activeCat === c
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "hover:bg-gray-50"
                        )}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                ))}

                {hasTechnical && (
                    <button
                        onClick={() => setActiveCat("technical")}
                        className={cx(
                            "rounded-full border px-3 py-1.5 text-sm transition",
                            activeCat === "technical"
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "hover:bg-gray-50"
                        )}
                    >
                        Technical
                    </button>
                )}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-40 animate-pulse rounded-[28px] bg-white/70 shadow-sm"
                        />
                    ))}
                </div>
            ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            ) : filteredInterviews.length === 0 ? (
                <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">
                    <p className="text-gray-600">No interviews match your search.</p>
                </div>
            ) : (
                <motion.div
                    variants={listContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                >
                    {filteredInterviews.map((i) => {
                        const rowKey = makeRowKey(i);
                        const isExpanded = expandedKey === rowKey;

                        const items = [
                            {
                                href: `/interviews/${i.id}/start`,
                                label: "Begin Interview",
                                icon: <PlayCircle className="h-6 w-6 text-green-500" />,
                            },
                            {
                                href: `/interviews/${i.id}/report`,
                                label: "View Report",
                                icon: <FileText className="h-6 w-6 text-blue-500" />,
                            },
                            {
                                href: `/interviews/${i.id}/settings`,
                                label: "Configure",
                                icon: <Settings className="h-6 w-6 text-gray-500" />,
                            },
                        ];

                        return (
                            <motion.div
                                key={rowKey}
                                variants={cardItem}
                                whileHover={{ y: -2 }}
                                className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5"
                            >
                                {/* Header */}
                                <div
                                    onClick={() => toggleExpand(rowKey)}
                                    className="relative group cursor-pointer select-none rounded-[28px] pr-14"
                                    style={{ backgroundColor: i.color }}
                                >
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-[28px]"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(0,0,0,0.04) 100%)",
                                        }}
                                    />
                                    <div className="flex items-start justify-between px-6 py-6">
                                        <div className="min-w-0">
                                            <h2 className="truncate text-2xl font-extrabold tracking-tight text-white">
                                                {i.title}
                                            </h2>
                                            <p className="mt-1 text-base capitalize text-white/90">
                                                {i.category} Interview
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                "flex items-center gap-2 transition-opacity duration-200 z-10",
                                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                            )}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/interviews/${i.id}/settings`);
                                                }}
                                                className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeletingId(i.id);
                                                    setShowConfirm(true);
                                                }}
                                                className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 z-0">
                                        <motion.span
                                            animate={{ rotate: isExpanded ? 90 : 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                            className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-white"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Expanded Actions */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="rounded-b-[28px] border-t border-black/10 bg-white">
                                                <nav className="space-y-1 px-6 py-4">
                                                    {items.map((it) => (
                                                        <button
                                                            key={it.label}
                                                            onClick={() => router.push(it.href)}
                                                            className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-gray-50"
                                                        >
                              <span className="h-6 w-6 grid place-items-center">
                                {it.icon}
                              </span>
                                                            <span className="font-medium text-gray-900">{it.label}</span>
                                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                                        </button>
                                                    ))}
                                                </nav>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Delete Confirm */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
                        >
                            <h3 className="text-lg font-semibold">Confirm Delete</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Are you sure you want to delete this interview? This action cannot be undone.
                            </p>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setShowConfirm(false);
                                        setDeletingId(null);
                                    }}
                                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteInterview}
                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
