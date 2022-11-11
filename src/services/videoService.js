import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://bqntwihuowpidgpjbhqz.supabase.co'
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbnR3aWh1b3dwaWRncGpiaHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzY5MDMsImV4cCI6MTk4Mzc1MjkwM30.0Qfu0meAPxITM1_bEJorrTFKGK_DwgniSFx2VlFcqQA"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos")
                .select("*");
        }
    }
}