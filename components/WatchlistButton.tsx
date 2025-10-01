"use client";
import React, {useMemo, useState} from "react";

// WatchlistButton: toggles local state and persists via /api/watchlist

const WatchlistButton = ({
                             symbol,
                             company,
                             isInWatchlist,
                             showTrashIcon = false,
                             type = "button",
                             onWatchlistChange,
                         }: WatchlistButtonProps) => {
    const [added, setAdded] = useState<boolean>(!!isInWatchlist);
    const [busy, setBusy] = useState<boolean>(false);

    const label = useMemo(() => {
        if (type === "icon") return "";
        if (busy) return added ? "Removing..." : "Adding...";
        return added ? "Remove from Watchlist" : "Add to Watchlist";
    }, [added, type, busy]);

    const handleClick = async () => {
        if (busy) return;
        const next = !added;
        setAdded(next);
        onWatchlistChange?.(symbol, next);

        try {
            setBusy(true);
            const res = await fetch("/api/watchlist", {
                method: next ? "POST" : "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({symbol, company}),
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (e) {
            // revert on failure
            setAdded(!next);
        } finally {
            setBusy(false);
        }
    };

    const commonProps = {
        title: added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`,
        "aria-label": added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`,
        onClick: handleClick,
        disabled: busy,
    } as const;

    if (type === "icon") {
        return (
            <button
                {...commonProps}
                className={`watchlist-icon-btn ${added ? "watchlist-icon-added" : ""}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={added ? "#FACC15" : "none"}
                    stroke="#FACC15"
                    strokeWidth="1.5"
                    className="watchlist-star"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                    />
                </svg>
            </button>
        );
    }

    return (
        <button
            className={`watchlist-btn flex flex-row items-center p-2 ${added ? "watchlist-remove" : ""}`} {...commonProps}>
            {showTrashIcon && added ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2 "
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 4v6m4-6v6m4-6v6"/>
                </svg>
            ) : null}
            <span>{label}</span>
        </button>
    );
};

export default WatchlistButton;
