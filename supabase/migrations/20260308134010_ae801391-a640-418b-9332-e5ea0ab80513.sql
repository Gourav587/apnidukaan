CREATE OR REPLACE FUNCTION public.increment_khata_balance(_customer_id uuid, _amount numeric)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  UPDATE public.khata_customers
  SET balance = balance + _amount,
      updated_at = now()
  WHERE id = _customer_id;
$$;