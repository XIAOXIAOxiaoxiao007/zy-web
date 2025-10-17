"use client";

import { useEffect, useState } from "react";
import { getUserProfile, saveUserProfile, UserProfile } from "@/lib/userProfile";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({ name: "" });
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const p = getUserProfile() || { name: "新用户" };
    setProfile(p);
    setPreview(p.avatarDataUrl);
  }, []);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setProfile((prev) => ({ ...prev, avatarDataUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="max-w-screen-sm mx-auto px-4 pt-6 pb-20">
      <h1 className="text-xl font-semibold">编辑资料</h1>
      <div className="mt-4 space-y-4 rounded-xl border bg-white p-4 shadow">
        <div>
          <div className="text-sm font-medium mb-1">头像</div>
          <div className="flex items-center gap-3">
            {preview ? (
              <img src={preview} alt="avatar" className="h-16 w-16 rounded-full border" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 border" />
            )}
            <label className="px-3 py-1.5 rounded-md bg-gray-100 border text-sm cursor-pointer transition active:scale-95">
              选择图片
              <input type="file" accept="image/*" className="hidden" onChange={onPickFile} />
            </label>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">昵称</div>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="输入你的昵称"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1.5 rounded-md border text-sm transition active:scale-95"
            onClick={() => router.back()}
          >
            取消
          </button>
          <button
            className={
              "px-3 py-1.5 rounded-md text-sm transition active:scale-95 " +
              (saving ? "bg-gray-200 text-gray-500" : "bg-black text-white")
            }
            disabled={saving}
            onClick={() => {
              if (!profile.name.trim()) return;
              setSaving(true);
              try {
                saveUserProfile({ name: profile.name.trim(), avatarDataUrl: preview });
                router.push("/profile");
              } finally {
                setSaving(false);
              }
            }}
          >
            保存
          </button>
          <button
            className={
              "px-3 py-1.5 rounded-md text-sm transition active:scale-95 " +
              (syncing ? "bg-gray-200 text-gray-500" : "bg-indigo-600 text-white")
            }
            disabled={syncing}
            onClick={async () => {
              if (!profile.name.trim()) return;
              setSyncing(true);
              try {
                // Use local token as uid seed
                const uid = (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null) || 'local';
                await fetch('/api/profile', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ uid, name: profile.name.trim(), avatarDataUrl: preview || null }),
                });
                router.push('/profile');
              } finally {
                setSyncing(false);
              }
            }}
          >
            同步到云端
          </button>
        </div>
      </div>
    </section>
  );
}


