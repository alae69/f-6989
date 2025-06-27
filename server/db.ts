
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://uswzqnvntracnrzkodyd.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzd3pxbnZudHJhY25yemtvZHlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTAyMDg4NiwiZXhwIjoyMDY2NTk2ODg2fQ.YEAaWqnmVmzVUAjJD6sYzRQqR7i4zNdKNXQC3SdBJyM";

// For server-side operations, we use the service role key
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Legacy exports for compatibility (can be removed once routes are updated)
export const db = supabase;
export const pool = null; // Not needed for Supabase
