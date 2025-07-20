import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./TravelPlan.css";
import { itineraryApi } from "../../apiurl";
function TravelPlan() {
  const location = useLocation();
  const data = location.state;

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) return;

//     const prompt = `
// You are a professional travel planner.

// Create a clear, concise, and friendly ${data.days}-day travel itinerary for a ${data.tripType} trip to ${data.destination}, starting from ${data.startDate}, for ${data.people} people. The total budget is ₹${data.budget}.

// The travelers are interested in: ${data.interests.join(", ")}.

// 📝 Format the itinerary like this:

// 1. **Trip Title** — fun + descriptive (e.g., "Manali in 3 Days: Snow & Serenity for Couples")
// 2. **Basic Info**: Dates, number of people, trip type, budget
// 3. **Accommodation Suggestion**: 
//    - Budget-friendly stays or areas
//    - Cost per night for group
// 4. **Itinerary by Day**:
//    - Timeline format (e.g., '9:00 AM - Visit XYZ')
//    - Include 3–5 main activities per day
//    - 1 useful tip per day (⚡ short + friendly)
// 5. **Budget Summary**:
//    - Estimated daily costs (stay, food, travel, entry fees, etc.)
//    - Total breakdown for all people
//    - Practical savings tip 💡

// 🎯 Keep it:
// - Easy to read (use bold headings, bullet points, simple layout)
// - Relevant to their interests
// - Tailored to the group type (e.g., families need relaxed mornings, couples might want romantic spots)
// - Under budget when possible

// Avoid generic filler text and keep it localized to the destination.
// `;
const prompt = `
You are a professional travel planner.

Generate a ${data.days}-day itinerary for a ${data.tripType} trip from ${data.from} to ${data.to}, starting on ${data.startDate}, for ${data.people} people, with a ₹${data.budget} total budget.

Include:
1. **Trip Summary**: Dates, group type, total budget.
2. **Travel Options**: Recommend best mode (flight/train/bus) with real provider names, departure/arrival times, and cost.
3. **Hotel Suggestion**: Hotel/guesthouse name, location, nightly cost.
4. **Daily Plan**: 
   - Food: Places for breakfast, lunch, dinner
   - Activities (3–5 per day with times)
   - One local tip per day ⚡
5. **Budget Breakdown**: Total cost per category (travel, stay, food, activities)
6. 💡 One budget-saving tip

Only use real places, restaurants, and transport providers. Be concise, practical, and budget-conscious.
`;


    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await fetch(itineraryApi+"generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const json = await res.json();
        const markdown = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        setPlan(markdown || "No response from Gemini.");
      } catch (error) {
        console.error("Fetch error:", error);
        setPlan("Failed to generate plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [data]);

  const renderHTML = (markdown) =>
    DOMPurify.sanitize(marked(markdown || ""));

  return (
    <div className="travel-container">
      <div className="travel-box">
        <h2 className="travel-title">
          Your {data?.days}-Day Itinerary for {data?.destination}
        </h2>
        {loading ? (
          <p className="travel-loading">Generating itinerary...</p>
        ) : (
          <div
            className="travel-plan-text"
            dangerouslySetInnerHTML={{ __html: renderHTML(plan) }}
          />
        )}
      </div>
    </div>
  );
}

export default TravelPlan;
