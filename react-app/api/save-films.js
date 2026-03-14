import { supabase } from "../lib/supabase.js";

export default async function handler(request, response) {
    if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });

    try {
        const { films } = request.body ?? {};

        if (!Array.isArray(films) || films.length === 0) return response.status(400).json({ error: "Films array is required" });

        const rows = films.map((film) => ({
            episode_id: film.episode_id,
            title: film.title,
            director: film.director ?? null,
            producer: film.producer ?? null,
            opening_crawl: film.opening_crawl ?? null,
            release_date: film.release_date ?? null,
        }));

        const { error } = await supabase
            .from("films")
            .upsert(rows, { onConflict: "episode_id" });

        if (error) {
            throw new Error(error.message);
        }

        return response.status(200).json({ savedCount: rows.length });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
