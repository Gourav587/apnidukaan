
CREATE OR REPLACE FUNCTION public.decrease_stock_on_order()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
  item JSONB;
  product_id UUID;
  qty INT;
  current_stock INT;
  product_name TEXT;
BEGIN
  FOR item IN SELECT * FROM jsonb_array_elements(NEW.items)
  LOOP
    product_id := (item->>'id')::UUID;
    qty := (item->>'quantity')::INT;
    
    SELECT stock, name INTO current_stock, product_name
    FROM public.products
    WHERE id = product_id
    FOR UPDATE;
    
    IF current_stock IS NULL THEN
      RAISE EXCEPTION 'Product not found: %', product_id;
    END IF;
    
    IF qty > current_stock THEN
      RAISE EXCEPTION 'Insufficient stock for "%": requested %, available %', product_name, qty, current_stock;
    END IF;
    
    UPDATE public.products
    SET stock = stock - qty
    WHERE id = product_id;
  END LOOP;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_decrease_stock_on_order ON public.orders;
CREATE TRIGGER trg_decrease_stock_on_order
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.decrease_stock_on_order();
