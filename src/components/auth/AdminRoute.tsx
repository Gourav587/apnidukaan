import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";
import { toast } from "sonner";

export const AdminRoute = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            try {
                const { data: { session }, error: authError } = await supabase.auth.getSession();

                if (authError || !session) {
                    if (mounted) setIsAuthorized(false);
                    return;
                }

                const { data: roleData, error: roleError } = await supabase
                    .from("user_roles")
                    .select("role")
                    .eq("user_id", session.user.id)
                    .eq("role", "admin")
                    .maybeSingle();

                if (roleError || !roleData) {
                    if (mounted) {
                        toast.error("Access denied. Admin privileges required.");
                        setIsAuthorized(false);
                    }
                    return;
                }

                if (mounted) {
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                if (mounted) setIsAuthorized(false);
            }
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, []);

    // Show loading spinner while checking auth status
    if (isAuthorized === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 animate-pulse">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            </div>
        );
    }

    // Redirect to admin login if not authorized, saving their intended destination
    if (!isAuthorized) {
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    // Render child routes if authorized
    return <Outlet />;
};
