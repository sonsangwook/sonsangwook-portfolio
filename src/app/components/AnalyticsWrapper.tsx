"use client";

import { Analytics } from "@vercel/analytics/next";

export function AnalyticsWrapper() {
    return (
        <Analytics
            beforeSend={(event) => {
                // ?owner 파라미터로 접속하면 localStorage에 표시
                if (typeof window !== "undefined") {
                    if (window.location.search.includes("owner")) {
                        localStorage.setItem("is_owner", "true");
                    }
                    // owner로 표시된 경우 데이터 수집 안 함
                    if (localStorage.getItem("is_owner") === "true") {
                        return null;
                    }
                }
                return event;
            }}
        />
    );
}
