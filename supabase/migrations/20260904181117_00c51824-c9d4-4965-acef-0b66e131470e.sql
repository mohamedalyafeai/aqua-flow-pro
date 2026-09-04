ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS last_contacted_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS preferred_date text;

CREATE TABLE IF NOT EXISTS public.lead_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  channel text NOT NULL DEFAULT 'email',
  body text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.lead_replies TO authenticated;
GRANT ALL ON public.lead_replies TO service_role;

ALTER TABLE public.lead_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view replies"
  ON public.lead_replies FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can add replies"
  ON public.lead_replies FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND author_id = auth.uid());

CREATE INDEX IF NOT EXISTS lead_replies_lead_id_idx ON public.lead_replies(lead_id, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);