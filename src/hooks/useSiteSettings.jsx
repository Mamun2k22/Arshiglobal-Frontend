import { useEffect, useState } from "react";
import { api } from "../../src/lib/api";

export default function useSiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("/api/site-settings")
      .then((r) => setSettings(r.data || {}))
      .catch(() => setSettings({}));
  }, []);

  return settings;
}
