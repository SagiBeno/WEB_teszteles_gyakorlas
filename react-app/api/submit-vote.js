import { supabase } from "../lib/supabase.js";

export default async function handler(request, response) {
    if (request.method !== "POST") {
        return response.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { studentName, teacherName, giftChoice, note } = request.body ?? {};

        if (!studentName?.trim()) return response.status(400).json({ error: "Student name is required" });


        if (!teacherName?.trim()) return response.status(400).json({ error: "Teacher name is required" });

        if (!giftChoice?.trim()) return response.status(400).json({ error: "Gift choice is required" });

        const { error } = await supabase.from("votes").insert({
            student_name: studentName.trim(),
            teacher_name: teacherName.trim(),
            gift_choice: giftChoice.trim(),
            note: note?.trim() || null,
        });

        if (error) {
            throw new Error(error.message);
        }

        return response.status(200).json({ success: true });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
