// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページ（パス）が変わるたびに一番上にスクロール
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}