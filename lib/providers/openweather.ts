// OpenWeatherMap adapter — called from the match loader to annotate
// the fixture card with venue weather. Returns null when no key is set.

const BASE = "https://api.openweathermap.org/data/2.5";

export async function weatherByCity(
  city: string,
): Promise<{ temp: number; description: string } | null> {
  const key = process.env.OPENWEATHER_KEY;
  if (!key || !city) return null;
  const url = new URL(BASE + "/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("appid", key);
  url.searchParams.set("units", "metric");
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return null;
  const json = (await res.json()) as {
    main: { temp: number };
    weather: { description: string }[];
  };
  return {
    temp: Math.round(json.main.temp),
    description: json.weather[0]?.description ?? "",
  };
}
