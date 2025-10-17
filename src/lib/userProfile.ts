export type UserProfile = {
  name: string;
  avatarDataUrl?: string; // data URL for custom avatar; fallback to default asset when absent
};

const PROFILE_KEY = "user_profile";

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.name === "string") return parsed as UserProfile;
  } catch {}
  return null;
}

export function saveUserProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function ensureDefaultProfile(seedName?: string) {
  if (typeof window === "undefined") return;
  try {
    const existing = getUserProfile();
    if (existing) return;
    const name = seedName && seedName.trim() ? seedName.trim() : "新用户";
    saveUserProfile({ name });
  } catch {}
}


