import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, MessageSquare, Phone, Mail, RefreshCw, Search } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { listLeads, replyToLead, updateLead } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { business, waLink } from "@/lib/business";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة الطلبات | رواد المضخات للتجارة" },
      { name: "description", content: "لوحة إدارة طلبات العملاء والردود لشركة رواد المضخات للتجارة." },
      { property: "og:title", content: "Enquiry Dashboard — Pioneers Pumps" },
      { property: "og:description", content: "Manage customer enquiries and replies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Enquiry Dashboard — Pioneers Pumps" },
      { name: "twitter:description", content: "Manage customer enquiries and replies." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
type Status = (typeof STATUSES)[number];

const statusLabel: Record<Status, string> = {
  new: "جديد / New",
  contacted: "تم التواصل / Contacted",
  quoted: "أُرسل عرض سعر / Quoted",
  won: "تم البيع / Won",
  lost: "مفقود / Lost",
};

function DashboardPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const sendReply = useServerFn(replyToLead);
  const patchLead = useServerFn(updateLead);

  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [channel, setChannel] = useState<"email" | "whatsapp" | "phone">("email");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads({}),
  });

  const replyMutation = useMutation({
    mutationFn: (vars: { lead_id: string; body: string; channel: "email" | "whatsapp" | "phone" }) =>
      sendReply({ data: vars }),
    onSuccess: () => {
      toast.success("تم حفظ الرد / Reply saved");
      setReplyText("");
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status?: Status; admin_notes?: string }) => patchLead({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const leads = data?.leads ?? [];
  const replies = data?.replies ?? [];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter((l: any) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!needle) return true;
      return [l.name, l.phone, l.email, l.service, l.product_slug, l.message]
        .filter(Boolean)
        .some((v: string) => v.toLowerCase().includes(needle));
    });
  }, [leads, q, statusFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    for (const s of STATUSES) c[s] = leads.filter((l: any) => l.status === s).length;
    return c;
  }, [leads]);

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Toaster richColors position="top-center" />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">لوحة الطلبات / Enquiry Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            كل طلب من الموقع يظهر هنا، ويمكنك تسجيل الرد ومتابعة الحالة.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`me-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            تحديث / Refresh
          </Button>
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="me-2 h-4 w-4" />
            خروج / Sign out
          </Button>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو الجوال / Search" className="ps-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as "all" | Status)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === s ? "border-brand bg-brand text-white" : "hover:border-brand hover:text-brand"
              }`}
            >
              {s === "all" ? `الكل / All (${counts["all"] ?? 0})` : `${statusLabel[s]} (${counts[s] ?? 0})`}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="mt-10 text-muted-foreground">جارٍ التحميل...</p>}
      {isError && (
        <div className="mt-10 rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm">
          <p className="font-semibold text-destructive">
            {error instanceof Error && error.message.includes("Forbidden")
              ? "حسابك ليس لديه صلاحية إدارة. / This account is not an admin yet."
              : "تعذر تحميل الطلبات. / Could not load enquiries."}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="mt-10 text-muted-foreground">لا توجد طلبات مطابقة. / No matching enquiries.</p>
      )}

      <div className="mt-6 space-y-4">
        {filtered.map((l: any) => {
          const leadReplies = replies.filter((r: any) => r.lead_id === l.id);
          const open = openId === l.id;
          return (
            <article key={l.id} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold">{l.name}</h2>
                    <Badge variant="outline" className="text-xs">{l.source}</Badge>
                    {l.product_slug && <Badge variant="secondary" className="text-xs">{l.product_slug}</Badge>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground" dir="ltr">
                    <a href={`tel:${l.phone}`} className="hover:text-brand">{l.phone}</a>
                    {l.email && <a href={`mailto:${l.email}`} className="hover:text-brand">{l.email}</a>}
                    <span>{new Date(l.created_at).toLocaleString("en-GB")}</span>
                  </div>
                  {l.service && <div className="mt-1 text-sm">الخدمة / Service: {l.service}</div>}
                  {l.preferred_date && <div className="text-sm">الموعد المفضل / Preferred: {l.preferred_date}</div>}
                  <p className="mt-3 whitespace-pre-wrap text-sm">{l.message}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={l.status}
                    onChange={(e) => statusMutation.mutate({ id: l.id, status: e.target.value as Status })}
                    className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{statusLabel[s]}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <a href={`tel:${l.phone}`} className="rounded-md border p-2 hover:border-brand hover:text-brand" aria-label="Call">
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={waLink(`مرحباً ${l.name}، بخصوص طلبكم لدى ${business.salesEmail}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border p-2 hover:border-brand hover:text-brand"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </a>
                    {l.email && (
                      <a
                        href={`mailto:${l.email}?subject=${encodeURIComponent("رواد المضخات — بخصوص طلبكم")}`}
                        className="rounded-md border p-2 hover:border-brand hover:text-brand"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <button
                  onClick={() => setOpenId(open ? null : l.id)}
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  {open ? "إغلاق" : `الردود (${leadReplies.length}) / Replies`}
                </button>

                {open && (
                  <div className="mt-4 space-y-3">
                    {leadReplies.map((r: any) => (
                      <div key={r.id} className="rounded-lg bg-secondary/40 p-3 text-sm">
                        <div className="text-xs text-muted-foreground">
                          {r.channel} · {new Date(r.created_at).toLocaleString("en-GB")}
                        </div>
                        <p className="mt-1 whitespace-pre-wrap">{r.body}</p>
                      </div>
                    ))}

                    <div className="rounded-lg border p-3">
                      <div className="flex flex-wrap gap-2">
                        {(["email", "whatsapp", "phone"] as const).map((c) => (
                          <button
                            key={c}
                            onClick={() => setChannel(c)}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                              channel === c ? "border-brand bg-brand text-white" : ""
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                        placeholder="اكتب ردك هنا... / Write your reply..."
                        className="mt-3"
                      />
                      <Button
                        className="mt-3 bg-brand text-white hover:bg-brand-deep"
                        disabled={replyMutation.isPending || replyText.trim().length < 2}
                        onClick={() =>
                          replyMutation.mutate({ lead_id: l.id, body: replyText.trim(), channel })
                        }
                      >
                        حفظ الرد / Save reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
