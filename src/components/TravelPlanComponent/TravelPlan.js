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

Create a clear and concise ${data.days}-day itinerary for a ${data.tripType} trip to ${data.destination}, starting ${data.startDate}, for ${data.people} people, with a ₹${data.budget} budget.

Interests: ${data.interests.join(", ")}

Structure:
1. **Trip Title** — fun & descriptive
2. **Trip Info**: Dates, group size, type, budget
3. **Stay Suggestion**: Area + approx. cost
4. **Daily Itinerary**:
   - 3–5 key activities per day (timeline style)
   - 1 local tip per day (⚡short)
5. **Budget Summary**: Daily & total estimates, 1 savings tip 💡

Keep it:
- Easy to scan (bold headers, bullet points)
- Matched to group & interests
- Budget-conscious
- Avoid generic filler
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
