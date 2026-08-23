ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS payer_phone text NOT NULL DEFAULT '';
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS provider_ref text NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS deposits_provider_ref_idx ON public.deposits (provider_ref);